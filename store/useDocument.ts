import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface DocumentState {
  document: Doc<"documents"> | null;
  setDocument: (docs: Doc<"documents">) => void;
  getDocument: () => Doc<"documents"> | null;
}

const useDocument = create<DocumentState>((set, get) => ({
  document: null,
  setDocument: (docs) => set({ document: docs }),
  getDocument: () => {
    if (get().document) {
      return get().document;
    }
    return null;
  },
}));

export default useDocument;
