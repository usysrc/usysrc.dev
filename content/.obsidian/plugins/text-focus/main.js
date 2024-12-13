/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TextFocusPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var TextFocusPlugin = class extends import_obsidian.Plugin {
  /**
   * Registers the new note event when the workspace layout is ready
   */
  async onload() {
    this.app.workspace.onLayoutReady(() => {
      this.registerEvent(
        this.app.vault.on("create", (file) => {
          if (file.name.endsWith(".md")) {
            this.changeFocus();
          }
        })
      );
      this.registerEvent(
        this.app.workspace.on("layout-change", () => {
          this.changeFocus();
        })
      );
    });
  }
  /**
   * Changes the focus to the note.
   */
  async changeFocus() {
    await sleep(50);
    const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!view) {
      return;
    }
    if (view.getMode() !== "source") {
      return;
    }
    const editor = view.editor;
    if (editor) {
      editor.focus();
    }
  }
};

/* nosourcemap */