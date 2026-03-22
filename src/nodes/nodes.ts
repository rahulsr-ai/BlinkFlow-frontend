import { ResultNode } from "../components/ResultNode";
import { TextSenderNode } from "../components/TextSenderNode";
import ButtonEdge from "../components/ButtonEdge"; // Import your new edge

export const initialNodes = [
  {
    id: 'n1',
    type: 'textSender',
    position: { x: 0, y: 180 },
    data: { label: 'Sender' },
  },
  {
    id: 'n2',
    type: 'resultReceiver',
    position: { x: 500, y: 10 },
    data: { label: '' },
  },

];

export const nodeTypes = {
  textSender: TextSenderNode,
  resultReceiver: ResultNode,
};


export const edgeTypes = {
  animatedNode: ButtonEdge,
};

export const initialEdges = [


  {
    id: 'n1->n2',
    type: 'animatedNode',
    source: 'n1',
    target: 'n2',
    data: { node: 'n3' },
  },

];