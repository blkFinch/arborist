import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { editNodeData, removeNode } from "../../store/Document";

interface TextNodeProps {
  text: string;
  active: boolean;
  nodeId: string;
  handleNodeClick: () => void;
}

interface StyledTextNodeProps {
  //this needs to be a string because boolean is causing some error with TS
  active: string;
}
const StyledTextArea = styled.textarea`
  background-color: ${(props) => props.theme.colors.soft};
  border: none;
  outline: none;
  width: 100%;
  height: inherit;
  min-height: 80px;
  max-width: 100%;
`;

//Had to get funky with the css here:
// The text node is position relative so that the add buttons can be position absolute
// while remaining in the same container as the text node. This allows them to float over
// the text and take up the mex hieight of the text node.
const StyledTextNode = styled.div<StyledTextNodeProps>`
  border-radius: 2px;
  padding: 5px 10px;
  margin: 5px 0px;
  box-shadow: none;
  width: 400px;
  min-height: 100px;
  height: auto;
  position: relative;
  background-color: ${(props) => props.theme.colors.secondary};
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.info};
    color: ${(props) => props.theme.colors.text};
    ${StyledTextArea} {
      background-color: ${(props) => props.theme.colors.info};
      color: ${(props) => props.theme.colors.text};
    }
  }
  ${(props) =>
    props.active === "true" &&
    css`
      background-color: ${(props) => props.theme.colors.soft};
      color: ${(props) => props.theme.colors.dark};
    `}
`;

const AddButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: inherit;
  position: absolute;
  width: inherit;
  top: 0;
  bottom: 0;
  pointer-events: none; /* allows the text area to be selected */
  justify-items: center;
`;

const BaseButton = styled.button`
  background-color: #fff;
  padding: 2px 5px;
  cursor: pointer;
  pointer-events: auto;
  opacity: 0.5;
  &:hover{
    opacity: 1;
  }
`;

const TopAddButton = styled(BaseButton)`
  grid-column: 2;
  grid-row: 1;
  align-self: flex-start;
`;

const DeleteButton = styled(BaseButton)`
background-color: ${(props) => props.theme.colors.danger};
  grid-column: 3;
  grid-row: 1;
  align-self: flex-start;
  justify-self: end;
`;

const RightAddButton = styled(BaseButton)`
  grid-column: 3;
  grid-row: 2;
  align-self: center;
  justify-self: end;
`;

const BottomAddButton = styled(BaseButton)`
  grid-column: 2;
  grid-row: 3;
  align-self: flex-end;
`;

const StyledContent = styled.div`
  padding: 5px 10px;
`;

function TextNode({ text, nodeId, active, handleNodeClick }: TextNodeProps) {
  const [textAreaValue, setTextAreaValue] = useState(text || "");
  const dispatch = useAppDispatch();

  //when the text prop changes, update the text area value
  //otherwise the text prop only updates when the node is mounted
  // and the text area value will not update on select 
  useEffect(() => {
    setTextAreaValue(text || "");
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleNodeBlur = () => {
    dispatch(editNodeData(textAreaValue));
  };

  const handleNodeDelete = () => {
    dispatch(removeNode(nodeId));
  }

  if (active == true) {
    return (
      <StyledTextNode active={active.toString()} 
      onClick={handleNodeClick} onMouseLeave={handleNodeBlur}>
        <AddButtonsWrapper>
          <TopAddButton
            onClick={() => {
            }}
          >
            +
          </TopAddButton>
          <DeleteButton onClick={handleNodeDelete}>x</DeleteButton>
          <RightAddButton>+</RightAddButton>
          <BottomAddButton>+</BottomAddButton>
        </AddButtonsWrapper>
        <StyledContent>
          <StyledTextArea
            onChange={handleTextChange}
            onBlur={handleNodeBlur}
            value={textAreaValue}
          />
        </StyledContent>
      </StyledTextNode>
    );
  } else {
    return (
      <StyledTextNode active={active.toString()} onClick={handleNodeClick} onMouseEnter={handleNodeClick}>
        <StyledContent>{text}</StyledContent>
      </StyledTextNode>
    );
  }
}

export default TextNode;
