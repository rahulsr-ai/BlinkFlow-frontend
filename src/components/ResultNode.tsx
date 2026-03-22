import { Handle, Position } from "@xyflow/react";
import { useStore } from "../../lib/Store";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";

export function ResultNode() {
    const { result, status, prompt } = useStore();
    const [isSaving, setIsSaving] = useState(false);

    const isProcessing = status === 'processing';

    const saveTheResult = async () => {
        if (!result) return;

        setIsSaving(true);
        try {

            const res = await axios.post(`${apiUrl}/api/save-result`, {
                result: result,
                prompt: prompt
            });

            if (res.data.error) {
                toast.error("Failed to save result: " + res.data.message);
            } else {
                toast.success("Result saved successfully!");
            }

        } catch (error) {
            console.error('Error occurred while saving the result', error);
            toast.error("Network error: Failed to save result.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={`
            bg-stone-50 p-1 rounded-2xl border transition-all duration-300 overflow-hidden
            ${isProcessing ? 'processing-node-border glow-processing' : 'border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}
            lg:w-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        `}>

            {/* Header Ribbon */}
            <div className={`
                px-4 py-2 flex justify-between items-center border-b transition-colors
                ${isProcessing ? 'bg-indigo-50/50 border-indigo-100' : 'bg-stone-100/80 border-stone-200'}
            `}>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isProcessing ? 'text-indigo-600' : 'text-stone-500'}`}>
                    {isProcessing ? 'Processing Data...' : 'Data Output Terminal'}
                </span>
                <div className="flex gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-indigo-400 animate-bounce' : 'bg-stone-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-indigo-400 animate-bounce delay-75' : 'bg-stone-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-indigo-600 animate-pulse' : 'bg-indigo-500 opacity-30'}`}></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 bg-white relative">
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                <div
                    id="text-display"
                    className="nodrag w-full h-40 bg-transparent text-stone-800 font-mono text-sm 
                    leading-relaxed overflow-y-auto block whitespace-pre-wrap"
                    style={{
                        pointerEvents: 'all',
                        cursor: 'text',
                        userSelect: 'text'
                    }}
                >
                    {result || (
                        <span className="text-stone-400 opacity-50 italic">
                            {isProcessing ? "// Fetching from neural network..." : "// Awaiting data stream..."}
                        </span>
                    )}
                </div>

                {/* Save Button - Only shows when there is a result and not currently processing */}
                {result && !isProcessing && (
                    <button
                        onClick={saveTheResult}
                        disabled={isSaving}
                        className="mt-3 w-full py-2 px-4 bg-stone-100 hover:bg-stone-200  text-xs font-bold 
                        rounded-lg transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'SAVING...' : 'SAVE TO DATABASE'}
                    </button>
                )}
            </div>

            {/* Footer Status */}
            <div className="px-4 py-2 bg-stone-100/50 border-t border-stone-200 flex justify-between items-center">
                <div className="flex gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full transition-colors ${status === 'success' ? 'bg-green-500' : 'bg-stone-300'}`}></div>
                    <div className={`h-1.5 w-1.5 rounded-full transition-colors ${status === 'error' ? 'bg-red-500' : 'bg-stone-300'}`}></div>
                </div>
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-tighter">
                    Status: <span className={`font-bold ${status === 'success' ? 'text-green-600' :
                        status === 'processing' ? 'text-indigo-600 animate-pulse' :
                            'text-stone-400'
                        }`}>
                        {status.toUpperCase()}
                    </span>
                </span>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                className={`w-3 h-3 border-2 border-white shadow-sm transition-colors ${isProcessing ? 'bg-indigo-600' : 'bg-stone-300'}`}
            />
        </div>
    );
}