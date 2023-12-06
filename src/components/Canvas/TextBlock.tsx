import * as Toolbar from "@radix-ui/react-toolbar";
import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { createNode } from "../../store/Stem";

const StyledToolbar = styled(Toolbar.Root)`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Toolbar.Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border-radius: 0px;
  padding: 5px 10px;
  box-shadow: none;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.info};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.dark};
  }
`;

interface textBlockProps {
  addBlock: (text: string) => void;
  removeBlock: () => void;
  addChild: (text: string) => void;
}

// TODO: this is a scaffold control. This should be renamed. In the future this will be replaced
//       by a rich text editor housed in TextNode
function TextBlock({ removeBlock, addChild }: textBlockProps) {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const addNode = (text: string) => {
    dispatch(createNode(text));
  };

  return (
    <div>
      <textarea id="text-node" onChange={handleTextChange}></textarea>

      <StyledToolbar>
        <StyledButton onClick={() => addNode(text)}>add</StyledButton>
        <StyledButton onClick={() => addChild(text)}>child</StyledButton>
        <StyledButton onClick={() => removeBlock()}>delete</StyledButton>
      </StyledToolbar>
    </div>
  );
}

export default TextBlock;
