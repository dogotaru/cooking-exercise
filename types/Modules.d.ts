declare interface NodeModule {
    hot: {
        accept(path?: string | string[], fn?: () => void, callback?: () => void): void;
    };
}

declare module "document"
declare module "*.scss"
declare module "*.less"
declare module "*.svg"
declare module "*.png"