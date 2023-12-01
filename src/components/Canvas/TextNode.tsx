import styled, { css } from "styled-components";

interface TextNodeProps {
  text: string;
  key: string;
  active: boolean;
  handleNodeClick: () => void;
}

interface StyledTextNodeProps {
  active: boolean;
}

const StyledTextNode = styled.div<StyledTextNodeProps>`
  border-radius: 0px;
  padding: 5px 10px;
  box-shadow: none;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.info};
  }
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.colors.soft};
      color: ${(props) => props.theme.colors.dark};
    `}
`;

// TODO: when active, make editable
function TextNode({ text, key, active, handleNodeClick }: TextNodeProps) {
  return (
    <StyledTextNode
      id={key}
      active={active}
      onClick={handleNodeClick}
    >
      {text}
    </StyledTextNode>
  );
}

export default TextNode;
