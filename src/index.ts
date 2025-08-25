type Selector = string | HTMLElement;

export interface FlowLayoutOptions {
  container: Selector;
  items: Selector | Selector[];
  gap?: number;
  appendToMinHeightColumn?: boolean;
}

export class FlowLayout {
  private options: FlowLayoutOptions;
  private debounceTimeout: NodeJS.Timeout | null = null;

  constructor(options: FlowLayoutOptions) {
    this.options = {
      gap: 10,
      ...options,
    };

    this.initialize();
  }

  private getContainer(): HTMLElement {
    const { container } = this.options;
    if (typeof container === 'string') {
      return document.querySelector(container) as HTMLElement;
    }
    return container;
  }

  private getItems(): HTMLElement[] {
    const { items } = this.options;
    return [items]
      .flat()
      .map(item => {
        if (typeof item === 'string') {
          return Array.from(
            document.querySelectorAll(item)
          ) as unknown as HTMLElement;
        }
        return item;
      })
      .flat();
  }

  public initialize(): void {
    const container = this.getContainer();

    container.style.position = 'relative';

    const resizeObserver = new ResizeObserver(() => {
      this.debounceUpdate();
    });

    const mutationObserver = new MutationObserver(mutations => {
      this.debounceUpdate();

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            resizeObserver.unobserve(node);
            resizeObserver.observe(node);
          }
        });
        mutation.removedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            resizeObserver.unobserve(node);
          }
        });
      });
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    resizeObserver.observe(container);
  }

  public update(): void {
    const { gap = 10, appendToMinHeightColumn = false } = this.options;
    const container = this.getContainer();
    const position = {
      x: 0,
    };

    const positions: Record<number, HTMLElement[]> = {};

    const items = this.getItems();
    const getPositionY = (items?: HTMLElement[]) => {
      return (
        items?.reduce((acc, item) => acc + item.offsetHeight + gap, 0) || 0
      );
    };
    const getHorizontalPadding = (node: HTMLElement) => {
      return (
        parseInt(getComputedStyle(node).paddingLeft.replace('px', '')) +
        parseInt(getComputedStyle(node).paddingRight.replace('px', ''))
      );
    };

    items.forEach(node => {
      const next = node.nextElementSibling as HTMLElement;
      if (node instanceof HTMLElement) {
        node.style.position = 'absolute';
        node.style.transform = `translate(${position.x}px, ${getPositionY(
          positions[position.x]
        )}px)`;

        positions[position.x] = [...(positions[position.x] || []), node];
        position.x += node.offsetWidth + gap;

        // 如果下一个元素的宽度大于容器宽度，则换列
        if (
          position.x + (next?.offsetWidth ?? 0) >
          container.clientWidth - getHorizontalPadding(node)
        ) {
          position.x = 0;
        }
        // 如果appendToMinHeightColumn为true，则将元素添加到高度最小的列，并且没有空列的情况下
        if (
          appendToMinHeightColumn &&
          // 判断当前列是否有元素
          getPositionY(positions[position.x]) !== 0
        ) {
          const columns = Object.entries(positions)
            .map(([x, item]) => {
              return [
                parseFloat(x),
                item.reduce((acc, item) => acc + item.offsetHeight + gap, 0),
              ];
            })
            .sort((a, b) => a[1] - b[1]);
          position.x = columns?.[0]?.[0] ?? 0;
        }
      }
    });

    container.style.height = `${
      Object.values(positions)
        .map(item =>
          item.reduce((acc, item) => acc + item.offsetHeight + gap, 0)
        )
        .reduce((acc, item) => Math.max(acc, item), 0) - gap
    }px`;
  }

  private debounceUpdate(): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.update();
    }, 100);
  }

  public updateOptions(newOptions: Partial<FlowLayoutOptions>): void {
    this.options = { ...this.options, ...newOptions };

    this.debounceUpdate();
  }
}

export default FlowLayout;
