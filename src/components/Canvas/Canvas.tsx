import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import TextColumn from "./TextColumn";

const StyledCanvas = styled.div`
  margin: 20px;
`;

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

function Canvas() {
  // TODO: remove textblocks? Are we using this?
  const [textBlocks, setTextBlocks] = useState<Node<string>[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeStem, setActiveStem] = useState<Stem<string>>(new Stem());
  const [stems, setStems] = useState<Stem<string>[]>([activeStem]);

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    activeStem.addNode(newNode);
    setTextBlocks(activeStem.getAllNodes()); //we lose all optimizations here :(
    setActiveNodeId(newNode.id);
  };

  const deleteTextBlock = () => {
    const prev = activeStem.getNode(activeNodeId)?.prev;
    const newActive = prev ? prev.id : activeStem.tail?.id;
    activeStem.removeNode(activeNodeId);
    setActiveNodeId(newActive || null);
    setTextBlocks(activeStem.getAllNodes());
  };

  // TODO: implement
  const addChild = (text: string) => {
    const active = activeStem.getNode(activeNodeId);
    const childNode = new Node(text);
    active?.addChild(childNode);
    // TODO: check if active stem has next? if not, create new stem
    const newStem: Stem<string> = new Stem();
    newStem.addNode(childNode);
    setStems([...stems, newStem]);
    setActiveStem(newStem);
    setActiveNodeId(childNode.id);
    console.log(stems);
    // then organize child into next col
    // perhaps use an array of activeStems ?? or a linked list of stems??
    // question: how do we sort the child into position of the next stem?
    //            it should be by order of parent node, and then by add order?
  };

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock
        addBlock={addTextBlock}
        removeBlock={deleteTextBlock}
        addChild={addChild}
      />
      <StyledColumnContainer>
        {stems.map((stem, i) => (
          <TextColumn
            key={i}
            tail={stem.tail}
            textBlocks={stem.getAllNodes()}
            activeNodeId={activeNodeId}
            handleNodeClick={handleNodeClick}
          />
        ))}
      </StyledColumnContainer>
    </StyledCanvas>
  );
}

export default Canvas;
