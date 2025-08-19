type Selector = string | HTMLElement;

export interface FlowLayoutOptions {
  container: Selector;
  items: Selector | Selector[];
  gap?: number;
}

export class FlowLayout {
  private options: FlowLayoutOptions;

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
      this.update();
    });

    const mutationObserver = new MutationObserver(() => {
      this.update();
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    resizeObserver.observe(container);
  }

  public update(): void {
    const { gap = 10 } = this.options;
    const container = this.getContainer();
    const position = {
      x: 0,
    };

    const positions: Record<number, HTMLElement[]> = {};

    const items = this.getItems();
    let lineMaxHeight = 0;

    items.forEach(node => {
      const next = node.nextElementSibling as HTMLElement;
      if (node instanceof HTMLElement) {
        node.style.position = 'absolute';
        node.style.transform = `translate(${position.x}px, ${positions[position.x]?.reduce((acc, item) => acc + item.offsetHeight + gap, 0) || 0}px)`;

        positions[position.x] = [...(positions[position.x] || []), node];
        position.x += node.offsetWidth + gap;

        lineMaxHeight = Math.max(lineMaxHeight, node.offsetHeight);
        if (
          position.x + (next?.offsetWidth ?? 0) >
          container.clientWidth -
            parseInt(
              getComputedStyle(container).paddingLeft.replace('px', '')
            ) -
            parseInt(getComputedStyle(container).paddingRight.replace('px', ''))
        ) {
          position.x = 0;
          lineMaxHeight = 0;
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

  public updateOptions(newOptions: Partial<FlowLayoutOptions>): void {
    this.options = { ...this.options, ...newOptions };

    this.update();
  }
}

export default FlowLayout;
