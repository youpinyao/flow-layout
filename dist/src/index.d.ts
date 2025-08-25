type Selector = string | HTMLElement;
export interface FlowLayoutOptions {
    container: Selector;
    items: Selector | Selector[];
    gap?: number;
    appendToMinHeightColumn?: boolean;
}
export declare class FlowLayout {
    private options;
    private debounceTimeout;
    constructor(options: FlowLayoutOptions);
    private getContainer;
    private getItems;
    initialize(): void;
    update(): void;
    private debounceUpdate;
    updateOptions(newOptions: Partial<FlowLayoutOptions>): void;
}
export default FlowLayout;
//# sourceMappingURL=index.d.ts.map