import styled, { css } from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { editNodeData } from "../../store/Document";

interface TextNodeProps {
  text: string;
  active: boolean;
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
  height: 100%;
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
  pointer-events: none;
  justify-items: center;
`;

const TopAddButton = styled.button`
  background-color: #fff; /* Set your desired background color */
  padding: 2px 5px;
  cursor: pointer;
  grid-column: 2;
  grid-row: 1;
  align-self: flex-start;
  pointer-events: auto;
`;

const RightAddButton = styled.button`
  background-color: #fff; /* Set your desired background color */
  padding: 2px 5px;
  cursor: pointer;
  grid-column: 3;
  grid-row: 2;
  align-self: center;
  justify-self: end;
  pointer-events: auto;
`;

const BottomAddButton = styled.button`
  background-color: #fff; /* Set your desired background color */
  padding: 2px 5px;
  cursor: pointer;
  grid-column: 2;
  grid-row: 3;
  align-self: flex-end;
  pointer-events: auto;
`;

const StyledContent = styled.div`
  padding: 5px 10px;
`;

function TextNode({ text, active, handleNodeClick }: TextNodeProps) {
  const [textAreaValue, setTextAreaValue] = useState(text || "");
  const dispatch = useAppDispatch();
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };
  const handleNodeBlur = () => {
    dispatch(editNodeData(textAreaValue));
  };
  if (active == true) {
    return (
      <StyledTextNode active={active.toString()} onClick={handleNodeClick}>
        <AddButtonsWrapper>
          <TopAddButton onClick={() => {console.log("button click")}}>+</TopAddButton>
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
      <StyledTextNode active={active.toString()} onClick={handleNodeClick}>
        <StyledContent>{text}</StyledContent>
      </StyledTextNode>
    );
  }
}

export default TextNode;
