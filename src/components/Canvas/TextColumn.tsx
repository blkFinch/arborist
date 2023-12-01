import TextNode from "./TextNode";
import { Node } from "../../utils/DataStuctures";

interface TextColumnProps {
  tail: Node<string> | null;
  textBlocks: Node<string>[];
  activeNodeId: string | null;
  handleNodeClick: (id: string) => void;
}

function TextColumn({
  tail,
  textBlocks,
  activeNodeId,
  handleNodeClick,
}: TextColumnProps) {
  if (tail === null) {
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
