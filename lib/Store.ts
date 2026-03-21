import { create } from 'zustand';


type Status = 'idle' | 'processing' | 'success' | 'error';


// 1. Interface define karo (Types define karna zaroori hai)
interface AppState {
  prompt: string;
  result: string;
  status: Status;
  setStatus: (s: Status) => void;
  isProcessing: boolean; // Nayi state
  updatePrompt: (newPrompt: string) => void;
  updateResult: (newResult: string) => void;
  setProcessing: (status: boolean) => void; // Naya action
}


// 2. Create ke saath <AppState> lagao aur (set) function use karo
// Note: (state: any) => any wala error yahan se solve hoga
export const useStore = create<AppState>((set) => ({
  prompt: "What is the capital of France",
  result: "",
  status: 'idle',
  setStatus: (s) => set({ status: s }),
  isProcessing: false,
  updatePrompt: (newPrompt) => set({ prompt: newPrompt }),
  updateResult: (newResult) => set({ result: newResult, isProcessing: false , status: "success"}), 
  setProcessing: (status) => set({ isProcessing: status }),
}));

