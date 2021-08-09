"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var markdown_it_emoji_1 = require("markdown-it-emoji");
var markdown_it_sub_1 = require("markdown-it-sub");
var markdown_it_sup_1 = require("markdown-it-sup");
var markdown_it_footnote_1 = require("markdown-it-footnote");
// import MarkdownItDeflist from "markdown-it-deflist";
var markdown_it_abbr_1 = require("markdown-it-abbr");
// import MarkdownItIns from "markdown-it-ins";
var markdown_it_mark_1 = require("markdown-it-mark");
var markdown_it_latex_1 = require("markdown-it-latex");
// import MarkdownItKatex from "markdown-it-katex";
var markdown_it_toc_and_anchor_1 = require("markdown-it-toc-and-anchor");
var markdown_it_task_lists_1 = require("markdown-it-task-lists");
var markdown_it_source_map_1 = require("markdown-it-source-map");
exports.plugins = [
    markdown_it_emoji_1["default"],
    markdown_it_sub_1["default"],
    markdown_it_sup_1["default"],
    markdown_it_footnote_1["default"],
    markdown_it_abbr_1["default"],
    markdown_it_mark_1["default"],
    markdown_it_latex_1["default"],
    markdown_it_toc_and_anchor_1["default"],
    markdown_it_task_lists_1["default"],
    markdown_it_source_map_1["default"],
];
