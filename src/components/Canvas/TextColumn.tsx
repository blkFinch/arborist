import TextNode from "./TextNode";
import { Node } from "../../utils/DataStuctures";

interface TextColumnProps {
  head: Node<string> | null;
  textBlocks: Node<string>[];
  activeNodeId: string | null;
}

function TextColumn({ head, textBlocks, activeNodeId }: TextColumnProps) {
  if (head === null) {
    return <div>no text blocks</div>;
  }

  return (
    <div>
      {textBlocks.map((nodeData) => (
        <TextNode
          key={nodeData.id}
          text={nodeData.data}
          active={nodeData.id === activeNodeId}
        />
      ))}
    </div>
  );
}

export default TextColumn;
