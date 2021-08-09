export declare function myPlugin(opt: any): {
    name: string;
    transform(src: any, id: any): {
        code: any;
        map: null;
    } | undefined;
};
