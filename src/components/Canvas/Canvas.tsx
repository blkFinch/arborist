import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeNode, setActiveNode } from "../../store/Stem";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  const [activeStem, setActiveStem] = useState<Stem<string>>(new Stem());
  const [stems, setStems] = useState<Stem<string>[]>([activeStem]);
  const dispatch = useAppDispatch();
  const activeNodeId = useAppSelector((state) => state.stem.activeNodeId);

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    activeStem.addNode(newNode);
  };

  const handleDeleteBlock = () => {
   //If theres no block to delete, do nothing
    if (activeNodeId === null) {
      return;
    }
    //Delete the node
    dispatch(removeNode(activeNodeId));
  };

  //TODO: implement this in Redux
  const addChild = (text: string) => {
    console.warn("This Function is not implemented yet: addChild");

    const active = activeStem.getNode(activeNodeId);
    const childNode = new Node(text);
    active?.addChild(childNode);
    // TODO: check if active stem has next? if not, create new stem
    const newStem: Stem<string> = new Stem();
    newStem.addNode(childNode);
    setStems([...stems, newStem]);
    setActiveStem(newStem);
    // setActiveNodeId(childNode.id);
    console.log(stems);
    // then organize child into next col
    // perhaps use an array of activeStems ?? or a linked list of stems??
    // question: how do we sort the child into position of the next stem?
    //            it should be by order of parent node, and then by add order?
  };

  const handleNodeClick = (id: string) => {
    dispatch(setActiveNode(id));
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
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
