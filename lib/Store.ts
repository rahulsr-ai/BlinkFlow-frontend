import { create } from 'zustand';


type Status = 'idle' | 'processing' | 'success' | 'error';


interface AppState {
  prompt: string;
  result: string;
  status: Status;
  setStatus: (s: Status) => void;
  updatePrompt: (newPrompt: string) => void;
  updateResult: (newResult: string) => void;
}


export const useStore = create<AppState>((set) => ({
  prompt: "What is the capital of France",
  result: "",
  status: 'idle',
  setStatus: (s) => set({ status: s }),
  updatePrompt: (newPrompt) => set({ prompt: newPrompt }),
  updateResult: (newResult) => set({ result: newResult }),
}));

