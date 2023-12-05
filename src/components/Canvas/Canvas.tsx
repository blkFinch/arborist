import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  // TODO: implement state management and use that for nodes
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeStem, setActiveStem] = useState<Stem<string>>(new Stem());
  const [stems, setStems] = useState<Stem<string>[]>([activeStem]);

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    activeStem.addNode(newNode);
    setActiveNodeId(newNode.id);
  };

  //This logic feels loose to me- make sure we cant delete a stem that still has nodes
  // TODO: getting null pointer error when deleting last node in stem -- fix this method
  const handleDeleteBlock = () => {
   //If theres no block to delete, do nothing
    if (activeNodeId === null) {
      return;
    }

    activeStem.removeNode(activeNodeId);
    //TODO: set active node to the prev node in the stem

    //If theres still blocks in stem, do nothing
    if (!activeStem.isEmpty()){
      //we need to force a reload here to get the stems to rerender
      return;
    }

    //If theres no blocks in stem, delete the stem
    const updatedStems = stems.filter((stem) => stem !== activeStem);
    setStems(updatedStems);

    //If theres no stems, create a new stem
    if (updatedStems.length === 0){
      const newStem: Stem<string> = new Stem();
      setStems([newStem]);
      setActiveStem(newStem);
    }
  };

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
    //I think each node needs to know its stem to make this easier
    // consider giving each stem an id
    setActiveStem(stems.find((stem) => stem.getNode(id) !== undefined)!); 
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock
        addBlock={addTextBlock}
        removeBlock={handleDeleteBlock}
        addChild={addChild}
      />

      <ColumnContainer
        stems={stems}
        activeNodeId={activeNodeId}
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
