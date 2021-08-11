"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPlugin = void 0;
const vite_1 = require("vite");
const md2vue_1 = __importDefault(require("./md2vue"));
const fileRegex = /\.md$/;
let config;
let vuePlugin;
function myPlugin(opt = {}) {
    return {
        name: "md2vuedoc",
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
            vuePlugin = config.plugins.find((p) => p.name === "vite:vue");
        },
        transform(src, id) {
            if (fileRegex.test(id)) {
                // console.log(src, "src", id, "id");
                const filePath = id.startsWith(config.root + "/")
                    ? id
                    : vite_1.normalizePath(id);
                console.log(id.startsWith(config.root + "/"), config.root, id, vite_1.normalizePath(id));
                const md2vue = md2vue_1.default(opt);
                const codes = md2vue(src, filePath);
                // console.log(codes, 1);
                return {
                    code: codes,
                    map: null, // 如果可行将提供 source map
                };
            }
        },
    };
}
exports.myPlugin = myPlugin;
//# sourceMappingURL=index.js.map