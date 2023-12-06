import TextNode from "./TextNode";
import { useAppSelector } from "../../hooks";
import { NodeState } from "../../store/Stem";

interface TextColumnProps {
  handleNodeClick: (id: string) => void;
}

function TextColumn({ handleNodeClick }: TextColumnProps) {
  const nodes = useAppSelector((state) => state.stem.nodes);
  const activeNodeId = useAppSelector((state) => state.stem.activeNodeId);

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
