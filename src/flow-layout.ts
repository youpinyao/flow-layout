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
    let containerWidth = container.offsetWidth;

    container.style.position = 'relative';

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 1 && entries?.[0].target === container) {
        const newWidth = entries?.[0].borderBoxSize?.[0]?.inlineSize;

        if (newWidth !== containerWidth) {
          this.debounceUpdate();
        }

        containerWidth = newWidth;
      } else {
        this.debounceUpdate();
      }
    });

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
        } else {
          entry.target.setAttribute('data-visible', 'false');
        }
      });
    });

    const mutationObserver = new MutationObserver(mutations => {
      this.debounceUpdate();

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            resizeObserver.observe(node);
            intersectionObserver.observe(node);
          }
        });
        mutation.removedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            resizeObserver.unobserve(node);
            intersectionObserver.unobserve(node);
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

    const positions: Record<number, { nodes: HTMLElement[]; height: number }> =
      {};

    const items = this.getItems();
    const getHorizontalPadding = (node: HTMLElement) => {
      return (
        parseInt(getComputedStyle(node).paddingLeft.replace('px', '')) +
        parseInt(getComputedStyle(node).paddingRight.replace('px', ''))
      );
    };

    const containerWidth =
      container.clientWidth - getHorizontalPadding(container);

    items.forEach(node => {
      const next = node.nextElementSibling as HTMLElement;
      if (node instanceof HTMLElement) {
        if (!positions[position.x]) {
          positions[position.x] = {
            nodes: [],
            height: 0,
          };
        }
        const positionY = positions[position.x].height;
        const transform = `translate(${position.x}px, ${positionY}px)`;

        requestIdleCallback(() => {
          node.style.position = 'absolute';
          node.style.transform = transform;
        });

        positions[position.x].nodes = [
          ...(positions[position.x] || []).nodes,
          node,
        ];
        positions[position.x].height =
          positions[position.x].height + node.offsetHeight + gap;
        position.x += node.offsetWidth + gap;

        // 如果下一个元素的宽度大于容器宽度，则换列
        if (position.x + (next?.offsetWidth ?? 0) > containerWidth) {
          position.x = 0;
        }
        // 如果appendToMinHeightColumn为true，则将元素添加到高度最小的列，并且没有空列的情况下
        if (
          appendToMinHeightColumn &&
          // 判断当前列是否有元素
          positions[position.x]?.nodes
        ) {
          const columns = Object.entries(positions)
            .map(([x, item]) => {
              return [parseFloat(x), item.height];
            })
            .sort((a, b) => a[1] - b[1]);
          position.x = columns?.[0]?.[0] ?? 0;
        }
      }
    });

    requestIdleCallback(() => {
      container.style.height = `${
        Object.values(positions)
          .map(item => item.height)
          .reduce((acc, item) => Math.max(acc, item), 0) - gap
      }px`;
    });
  }

  private debounceUpdate(): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      console.time('update');
      this.update();
      console.timeEnd('update');
    }, 50);
  }

  public updateOptions(newOptions: Partial<FlowLayoutOptions>): void {
    this.options = { ...this.options, ...newOptions };

    this.debounceUpdate();
  }
}
