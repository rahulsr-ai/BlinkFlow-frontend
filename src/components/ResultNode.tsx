import { Handle, Position } from "@xyflow/react";
import { useStore } from "../../lib/Store";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";

export function ResultNode() {
    const { result, status, prompt, setStatus } = useStore();
    const [isSaving, setIsSaving] = useState(false);

    const isProcessing = status === 'processing';

    // Helper to get border color based on status
    const getBorderClass = () => {
        if (status === 'processing') return 'border-blue-500 glow-blue';
        if (status === 'success') return 'border-green-500';
        if (status === 'error') return 'border-red-500';
        return 'border-stone-200';
    };

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
                setStatus('error')
            } else {
                toast.success("Result saved successfully!");
                setStatus("success")
            }

        } catch (error) {
            console.error('Error occurred while saving the result', error);
            toast.error("Network error: Failed to save result.");
            setStatus('error')
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={`
            bg-stone-50 p-1 rounded-2xl border-2 transition-all duration-500 overflow-hidden
            ${getBorderClass()} shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            lg:w-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative
        `}>

            {/* Animated Scanning Line (Only shows when processing) */}
            {isProcessing && <div className="scanning-line"></div>}

            {/* Header Ribbon */}
            <div className={`
                px-4 py-2 flex justify-between items-center border-b transition-colors
                ${isProcessing ? 'bg-blue-50/50 border-blue-100' : 'bg-stone-100/80 border-stone-200'}
            `}>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isProcessing ? 'text-blue-600' : 'text-stone-500'}`}>
                    {isProcessing ? 'Processing Data...' : 'Data Output Terminal'}
                </span>
                {/* Status indicator dots */}
                <div className="flex gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-blue-400 animate-pulse' : 'bg-stone-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-stone-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-stone-300'}`}></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 bg-white relative">
                <div id="text-display" className="nodrag w-full h-40 bg-transparent text-stone-800 font-mono text-sm leading-relaxed overflow-y-auto block whitespace-pre-wrap">
                    {result || <span className="text-stone-400 opacity-50 italic">// Awaiting data stream...</span>}
                </div>

                {result && !isProcessing && (
                    <button
                        onClick={saveTheResult}
                        disabled={isSaving}
                        className="cursor-pointer mt-3 w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-xs font-bold rounded-lg transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? 'SAVING...' : 'SAVE TO DATABASE'}
                    </button>
                )}
            </div>

            <Handle type="target" position={Position.Left} className="w-3 h-3 border-2 border-white bg-stone-300" />
        </div>
    );
}