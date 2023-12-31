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
`;
const StyledTextNode = styled.div<StyledTextNodeProps>`
  border-radius: 2px;
  padding: 5px 10px;
  margin: 5px 0px;
  box-shadow: none;
  width: 400px;
  min-height: 50px;
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
