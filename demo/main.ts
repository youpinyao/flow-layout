import FlowLayout from '../src/index';

class FlowLayoutDemo {
  container: HTMLElement;
  flowLayout: FlowLayout | null;
  itemCounter: number;

  constructor() {
    this.container = document.getElementById('flowContainer') as HTMLElement;
    this.flowLayout = null;
    this.itemCounter = 0;

    this.initializeLayout();
    this.bindEvents();
    this.addInitialItems();
  }

  initializeLayout() {
    const gap = parseInt(
      (document.getElementById('gap') as HTMLInputElement).value
    );

    this.flowLayout = new FlowLayout({
      container: this.container,
      items: '.flow-item',
      gap,
      appendToMinHeightColumn: true,
    });
  }

  bindEvents() {
    document.getElementById('applyLayout')?.addEventListener('click', () => {
      this.updateLayout();
    });

    document.getElementById('addItem')?.addEventListener('click', () => {
      this.addItem();
    });

    document.getElementById('removeItem')?.addEventListener('click', () => {
      this.removeItem();
    });
  }

  addInitialItems() {
    // Add some initial items
    for (let i = 0; i < 100; i++) {
      this.addItem(i);
    }
  }

  addItem(index: number = 0) {
    this.itemCounter++;
    const item = document.createElement('div');
    item.className = 'flow-item';
    item.textContent = `Item ${this.itemCounter}`;
    // random width and height
    item.style.width = `200px`;
    item.style.height = `${Math.floor(Math.random() * 200) + (index % 2 ? 200 : 50)}px`;

    this.container.appendChild(item);
  }

  removeItem() {
    const lastItem = this.container.lastElementChild;
    if (lastItem) {
      this.container.removeChild(lastItem);
    }
  }

  updateLayout() {
    const gap = parseInt(
      (document.getElementById('gap') as HTMLInputElement).value
    );

    this.flowLayout?.updateOptions({
      gap,
    });
  }
}

// Initialize the demo when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FlowLayoutDemo();
});
