import { IEditorStore } from "@/types";
import { create } from "zustand";

const useEditorStore = create<IEditorStore>((set) => ({
  editor: null,
  initializeEditor: (editor) => {
    if (editor) {
      set({ editor });
    }
  },
}));

export default useEditorStore;
