# Flow Layout

一个轻量级的TypeScript流式布局插件，用于创建响应式的瀑布流布局。

## 特性

- 🎯 简单直观的API
- 📱 响应式瀑布流布局
- ⚡ 轻量级且高性能
- 🎨 可自定义间距设置
- 🔄 动态布局更新
- 👀 自动监听容器大小变化和DOM变化
- 📐 支持最小高度列优先布局

## 安装

```bash
npm install flow-layout
# or
yarn add flow-layout
# or
pnpm add flow-layout
```

## 使用方法

### 基础示例

```typescript
import FlowLayout from 'flow-layout';

const container = document.getElementById('my-container');

const flowLayout = new FlowLayout({
  container: container,
  items: '.item',
  gap: 10,
  appendToMinHeightColumn: true
});
```

### 高级示例

```typescript
import FlowLayout from 'flow-layout';

const container = document.getElementById('my-container');

const flowLayout = new FlowLayout({
  container: container,
  items: ['.item1', '.item2', '.item3'], // 支持多个选择器
  gap: 20,
  appendToMinHeightColumn: false
});

// 动态更新配置
flowLayout.updateOptions({
  gap: 15,
  appendToMinHeightColumn: true
});
```

## API 参考

### FlowLayoutOptions

```typescript
interface FlowLayoutOptions {
  container: string | HTMLElement;     // 容器元素或选择器
  items: string | HTMLElement | (string | HTMLElement)[];  // 布局项或选择器数组
  gap?: number;                       // 元素间距（像素，默认：10）
  appendToMinHeightColumn?: boolean;  // 是否优先添加到高度最小的列（默认：false）
}
```

### FlowLayout 类

#### 构造函数

```typescript
new FlowLayout(options: FlowLayoutOptions)
```

#### 方法

- `initialize()`: 初始化布局，设置观察器
- `update()`: 更新布局
- `updateOptions(newOptions: Partial<FlowLayoutOptions>)`: 更新布局配置

## 开发

### 环境要求

- Node.js 16+
- pnpm

### 设置

```bash
# 安装依赖
pnpm install

# 启动开发服务器（包含演示）
pnpm dev

# 构建库
pnpm build

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 项目结构

```
flow-layout/
├── src/
│   └── index.ts          # 主库代码
├── demo/
│   ├── index.html        # 演示页面
│   └── main.ts           # 演示JavaScript
├── dist/                 # 构建后的库文件
├── vite.config.ts        # Vite配置
├── tsconfig.json         # TypeScript配置
└── package.json          # 包配置
```

## 演示

运行开发服务器查看实时演示：

```bash
pnpm dev
```

然后在浏览器中打开 http://localhost:5173

## 构建

库使用Vite构建，输出ES模块和UMD格式：

```bash
pnpm build
```

构建产物：
- `dist/flow-layout.es.js` - ES模块格式
- `dist/flow-layout.umd.js` - UMD格式
- `dist/index.d.ts` - TypeScript声明文件

## 技术栈

- TypeScript
- ESLint
- Prettier
- Stylelint
- Vite
- pnpm

## 许可证

ISC
