import { create } from 'zustand';
import { PizzaOrder } from '@/lib/types';

interface PizzaStore {
  currentStep: number;
  order: Partial<PizzaOrder>;
  setOrder: (key: keyof PizzaOrder, value: PizzaOrder[keyof PizzaOrder]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOrder: () => void;
}

export const usePizzaStore = create<PizzaStore>((set) => ({
  currentStep: 1,
  order: {},
  setOrder: (key, value) => 
    set((state) => ({
      order: { ...state.order, [key]: value }
    })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  resetOrder: () => set({ currentStep: 1, order: {} }),
}));