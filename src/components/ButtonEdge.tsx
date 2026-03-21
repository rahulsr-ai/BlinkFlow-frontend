
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath, 
    type EdgeProps,
} from '@xyflow/react';

import axios from "axios";
import { useStore } from '../../lib/Store';
import { MousePointerClick } from 'lucide-react';

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
        setProcessing(true);
        try {
            if (!prompt || prompt.trim() === "") {
                updateResult('Please provide a prompt before generating.');
                return;
            }
            updateResult("Thinking...");
            const res = await axios.post(`${apiUrl}/api/ask-ai`, { prompt });
            updateResult(res.data.data);
        } catch (err) {
            updateResult("Error fetching response");
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
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg> */}
                        <MousePointerClick size={16} className="rotate-90" />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}