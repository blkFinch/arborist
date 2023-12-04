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
  const [activeStem] = useState<Stem<string>>(new Stem());

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    activeStem.addNode(newNode);
    setTextBlocks(activeStem.getAllNodes()); //we lose all optimizations here :(
    setActiveNodeId(newNode.id);
  };

  const deleteTextBlock = () => {
    const prev = activeStem.getNode(activeNodeId)?.prev
    const newActive = prev ? prev.id : activeStem.tail?.id 
    activeStem.removeNode(activeNodeId);
    setActiveNodeId(newActive || null);
    setTextBlocks(activeStem.getAllNodes());
  };

  // TODO: implement
  const addChild = (text: string) => {
    const active = activeStem.getNode(activeNodeId)
    const childNode = new Node(text)
    active?.addChild(childNode)
    // then organize child into next col
    // perhaps use an array of activeStems ?? or a linked list of stems??
    // question: how do we sort the child into position of the next stem?
    //            it should be by order of parent node, and then by add order?
  }

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock addBlock={addTextBlock} removeBlock={deleteTextBlock} />
      <TextColumn
        tail={activeStem.tail}
        textBlocks={textBlocks}
        activeNodeId={activeNodeId}
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
