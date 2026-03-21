
import type { Node } from '@xyflow/react';

// Data structure for the Sending Node
export type SenderNodeData = {
  onSendData: (text: string) => void;
};

// Data structure for the Receiving Node
export type ReceiverNodeData = {
  label: string;
};

// Combine them into a custom Node type for your App
export type AppNode =
  | Node<SenderNodeData, 'sender'>
  | Node<ReceiverNodeData, 'receiver'>;

