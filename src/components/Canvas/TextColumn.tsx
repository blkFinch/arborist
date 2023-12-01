import TextNode from "./TextNode";
import { Node } from "../../utils/DataStuctures";

interface TextColumnProps {
  head: Node<string> | null;
  textBlocks: Node<string>[];
  activeNodeId: string | null;
  handleNodeClick: (id: string) => void;
}

function TextColumn({
  head,
  textBlocks,
  activeNodeId,
  handleNodeClick,
}: TextColumnProps) {
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
          handleNodeClick={() => handleNodeClick(nodeData.id)}
        />
      ))}
    </div>
  );
}

export default TextColumn;
