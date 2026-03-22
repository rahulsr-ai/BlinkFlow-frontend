
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    type EdgeProps,
} from '@xyflow/react';

import axios from "axios";
import { useStore } from '../../lib/Store';
import { MousePointerClick } from 'lucide-react';
import { toast } from 'react-toastify';

const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";

export default function ButtonEdge({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const { prompt, updateResult, setProcessing } = useStore();

    const onEdgeClick = async () => {
        // 1. Validation check BEFORE setting processing to true
        if (!prompt || prompt.trim() === "") {
            updateResult('Please provide a prompt before generating.');
            return;
        }

        setProcessing(true);
        updateResult("Thinking...");

        try {
            const res = await axios.post(`${apiUrl}/api/ask-ai`, { prompt });

            if (res.data.error) {
                toast.error("Error: " + (res.data.msg || "Something went wrong"));
                updateResult('Some error occurred');
            } else {
                toast.success("Response generated!");
                updateResult(res.data.data || "No data returned");
            }
        } catch (err) {
            console.error(err);
            updateResult("Error fetching response");
            toast.error("Network error. Please try again.");
        } finally {
            setProcessing(false);
        }
    };



    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 2, stroke: '#d6d3d1' }} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button
                        className="w-8 h-8 bg-white border border-stone-200 rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 hover:scale-110 transition-all active:scale-90 text-green-500 font-bold cursor-pointer"
                        onClick={onEdgeClick}
                    >
                        <MousePointerClick size={16} className="rotate-90" />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}