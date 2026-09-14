import { create } from "zustand";

type EditorState = {
  isEditing: boolean;
  username: string;
  password: string;
  setSession: (username: string, password: string) => void;
  logout: () => void;
};

export const useEditor = create<EditorState>((set) => ({
  isEditing: false,
  username: "",
  password: "",
  setSession: (username, password) =>
    set({ isEditing: true, username, password }),
  logout: () => set({ isEditing: false, username: "", password: "" }),
}));
