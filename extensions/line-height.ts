import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (height: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const CustomLineHeightExtension = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (height: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { lineHeight: height }).run();
        },
      unsetLineHeight:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { lineHeight: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
