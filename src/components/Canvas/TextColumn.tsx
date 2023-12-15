import TextNode from "./TextNode";
import { useAppSelector } from "../../hooks";
import { NodeState } from "../../store/Document";

interface TextColumnProps {
  nodes: NodeState[];
  handleNodeClick: (id: string) => void;
}

function TextColumn({ handleNodeClick, nodes }: TextColumnProps) {
  const activeNodeId = useAppSelector((state) => state.document.activeNodeId);

  if (nodes.length < 1) {
    return <div>no text blocks</div>;
  }

  return (
    <div>
      {nodes.map((nodeData: NodeState) => (
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
