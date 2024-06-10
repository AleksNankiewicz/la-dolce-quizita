// src/store/useNavbarStore.ts
import { create } from "zustand";

interface NavbarState {
  navbarComponents: React.ReactNode[];
  setNavbarComponents: (components: React.ReactNode[]) => void;
}

const useNavbarStore = create<NavbarState>((set) => ({
  navbarComponents: [],
  setNavbarComponents: (components) => set({ navbarComponents: components }),
}));

export default useNavbarStore;
