import TextNode from "./TextNode";
import { Node } from "../../utils/DataStuctures";
import { useAppSelector } from "../../hooks";


interface TextColumnProps {
  tail: Node<string> | null;
  textBlocks: Node<string>[];
  activeNodeId: string | null;
  handleNodeClick: (id: string) => void;
}

function TextColumn({
  activeNodeId,
  handleNodeClick,
}: TextColumnProps) {
  
  const nodes = useAppSelector((state) => state.stem.nodes);

  if (nodes.length < 1) {
    return <div>no text blocks</div>;
  }

  return (
    <div>
      {nodes.map((nodeData: Node<string>) => (
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
