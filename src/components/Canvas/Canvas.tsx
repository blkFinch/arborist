import TextBlock from "./TextBlock";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";
import { useHotkeys } from 'react-hotkeys-hook'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeNode, setActiveNode, createNode, createChildNode, createNodeAbove } from "../../store/Document";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  const dispatch = useAppDispatch();
  const activeNodeId = useAppSelector((state) => state.document.activeNodeId);

  
  useHotkeys('ctrl+k', () => dispatch(createNode("")))
  useHotkeys('ctrl+l', () => dispatch(createChildNode("")))
  useHotkeys('ctrl+i', () => dispatch(createNodeAbove("")))
  
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
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
