import { create } from "zustand";

type EditorState = {
  isEditing: boolean;
  enter: () => void;
  logout: () => void;
};

export const useEditor = create<EditorState>((set) => ({
  isEditing: false,
  enter: () => set({ isEditing: true }),
  logout: () => set({ isEditing: false }),
}));
