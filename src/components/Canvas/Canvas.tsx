import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import TextColumn from "./TextColumn";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  const [textBlocks, setTextBlocks] = useState<Node<string>[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [stem] = useState<Stem<string>>(new Stem());

  // TODO: can we do this without using an array?? just pass the stem in, and iterate in the component dummy!
  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    stem.addNode(newNode);
    setTextBlocks(stem.getAllNodes()); //we lose all optimizations here :(
    setActiveNodeId(newNode.id);
  };

  // TODO: set active to node.previous
  const deleteTextBlock = () => {
    stem.removeNode(activeNodeId);
    setActiveNodeId(stem.tail?.id || null);
    setTextBlocks(stem.getAllNodes());
  };

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock addBlock={addTextBlock} removeBlock={deleteTextBlock} />
      <TextColumn
        tail={stem.tail}
        textBlocks={textBlocks}
        activeNodeId={activeNodeId}
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
