# Flow Layout

A lightweight TypeScript library for creating responsive grid layouts with CSS Grid.

## Features

- 🎯 Simple and intuitive API
- 📱 Responsive grid layouts
- ⚡ Lightweight and performant
- 🎨 Customizable gap and column settings
- 🔄 Dynamic layout updates

## Installation

```bash
npm install flow-layout
# or
yarn add flow-layout
# or
pnpm add flow-layout
```

## Usage

### Basic Example

```typescript
import FlowLayout from 'flow-layout';

const container = document.getElementById('my-container');
const items = Array.from(document.querySelectorAll('.item'));

const flowLayout = new FlowLayout({
  container,
  items,
  columns: 3,
  gap: 10
});

flowLayout.layout();
```

### Advanced Example

```typescript
import FlowLayout from 'flow-layout';

const container = document.getElementById('my-container');
const items = Array.from(document.querySelectorAll('.item'));

const flowLayout = new FlowLayout({
  container,
  items,
  columns: 4,
  gap: 20
});

// Apply initial layout
flowLayout.layout();

// Update layout dynamically
flowLayout.updateOptions({
  columns: 2,
  gap: 15
});

flowLayout.layout();
```

## API Reference

### FlowLayoutOptions

```typescript
interface FlowLayoutOptions {
  container: HTMLElement;  // The container element
  items: HTMLElement[];    // Array of items to layout
  gap?: number;           // Gap between items in pixels (default: 10)
  columns?: number;       // Number of columns (default: 3)
}
```

### FlowLayout Class

#### Constructor

```typescript
new FlowLayout(options: FlowLayoutOptions)
```

#### Methods

- `layout()`: Applies the current layout configuration
- `updateOptions(newOptions: Partial<FlowLayoutOptions>)`: Updates the layout options

## Development

### Prerequisites

- Node.js 16+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server with demo
pnpm dev

# Build library
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Formatting
pnpm format
```

### Project Structure

```
flow-layout/
├── src/
│   └── index.ts          # Main library code
├── demo/
│   ├── index.html        # Demo page
│   └── main.js           # Demo JavaScript
├── dist/                 # Built library files
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Package configuration
```

## Demo

Run the development server to see a live demo:

```bash
pnpm dev
```

Then open http://localhost:5173 in your browser.

## Building

The library is built using Vite and outputs both ES modules and UMD formats:

```bash
pnpm build
```

This creates:
- `dist/flow-layout.es.js` - ES module format
- `dist/flow-layout.umd.js` - UMD format
- `dist/index.d.ts` - TypeScript declarations

## License

ISC
