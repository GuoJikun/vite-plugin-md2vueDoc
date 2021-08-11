import { ResolvedConfig } from "vite";
export declare function myPlugin(opt?: any): {
    name: string;
    configResolved(resolvedConfig: ResolvedConfig): void;
    transform(src: any, id: any): {
        code: string;
        map: null;
    } | undefined;
};
