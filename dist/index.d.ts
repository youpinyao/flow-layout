export interface FlowLayoutOptions {
    container: HTMLElement;
    items: HTMLElement[];
    gap?: number;
    columns?: number;
}
export declare class FlowLayout {
    private options;
    constructor(options: FlowLayoutOptions);
    layout(): void;
    updateOptions(newOptions: Partial<FlowLayoutOptions>): void;
}
export default FlowLayout;
//# sourceMappingURL=index.d.ts.map