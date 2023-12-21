import TextNode from "./TextNode";
import { useAppSelector } from "../../hooks";
import { Node } from "../../utils/nodeHelpers";

interface TextColumnProps {
  nodes: Node[];
  handleNodeClick: (id: string) => void;
}

function TextColumn({ handleNodeClick, nodes }: TextColumnProps) {
  const activeNodeId = useAppSelector((state) => state.document.activeNodeId);

  if (nodes.length < 1) {
    return <div>no text blocks</div>;
  }

  return (
    <div>
      {nodes.map((nodeData: Node) => (
        <TextNode
          key={nodeData.id}
          text={nodeData.content}
          active={nodeData.id === activeNodeId}
          handleNodeClick={() => handleNodeClick(nodeData.id)}
        />
      ))}
    </div>
  );
}

export default TextColumn;
