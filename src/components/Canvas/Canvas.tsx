import { useState } from "react";
import TextBlock from "./TextBlock";
import { Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeNode, setActiveNode, createNode, createChildNode } from "../../store/Document";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  const [activeStem, setActiveStem] = useState<Stem<string>>(new Stem());
  const [stems] = useState<Stem<string>[]>([activeStem]);
  const dispatch = useAppDispatch();
  const activeNodeId = useAppSelector((state) => state.document.activeNodeId);
  
  const addTextBlock = (text: string) => {
    dispatch(createNode(text));
  }

  const handleDeleteBlock = () => {
   //If theres no block to delete, do nothing
    if (activeNodeId === null) {
      return;
    }
    //Delete the node
    dispatch(removeNode(activeNodeId));
  };

  const addChild = (text: string) => {
    dispatch(createChildNode(text));
  };

  const handleNodeClick = (id: string) => {
    dispatch(setActiveNode(id));
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
