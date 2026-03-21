
import { Handle, Position } from "@xyflow/react"; // Handle mat bhulna!
import { useStore } from "../../lib/Store";

export function TextSenderNode() {

  const { prompt } = useStore();

  const updatePrompt = useStore((state) => state.updatePrompt);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePrompt(e.target.value);
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-64 md:w-sm overflow-hidden flex flex-col transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {/* Stone Style Header */}
      <div className="bg-stone-100/80 px-4 py-3 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Input_Terminal
          </span>
        </div>
        <span className="text-[9px] font-mono text-stone-400">v1.0</span>
      </div>

      <div className="p-5 bg-stone-50">
        <div className="relative group">
          {/* Prompt Character - Indigo looks great on Stone */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 font-mono text-xs font-bold pointer-events-none">
            &gt;
          </span>

          <input
            id="text"
            name="text"
            value={prompt}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Type command..."
            className="nodrag w-full bg-white text-stone-800 text-sm pl-8 pr-4 py-3 rounded-xl border border-stone-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 
                       transition-all placeholder:text-stone-300 font-mono shadow-sm"
          />
        </div>


      </div>

      {/* React Flow Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-indigo-500 border-2 border-white shadow-sm"
      />
    </div>
  );
}