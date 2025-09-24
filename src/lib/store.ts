import { create } from 'zustand';

export type Role = 'ops' | 'engineer' | 'marketer';

export interface AppState {
  currentRole: Role;
  isV1View: boolean;
  setRole: (role: Role) => void;
  toggleV1View: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRole: 'ops',
  isV1View: false,
  setRole: (role) => set({ currentRole: role }),
  toggleV1View: () => set((state) => ({ isV1View: !state.isV1View })),
}));


