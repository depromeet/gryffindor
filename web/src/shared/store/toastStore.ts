import { create } from "zustand";

export interface ToastContent {
  id: number;
  message: string;
  duration: number;
}

interface ToastStore {
  toasts: ToastContent[];
  showToast: ({ message, duration }: { message: string; duration: number }) => void;
  hideToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: ({ message, duration }: { message: string; duration: number }) => {
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message, duration }],
    }));
  },
  hideToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
