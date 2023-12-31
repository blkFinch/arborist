import styled, { css } from "styled-components";

interface TextNodeProps {
  text: string;
  active: boolean;
  handleNodeClick: () => void;
}

interface StyledTextNodeProps {
  //this needs to be a string because boolean is causing some error with TS
  active: string;
}

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
  }
  ${(props) =>
    props.active === 'true' &&
    css`
      background-color: ${(props) => props.theme.colors.soft};
      color: ${(props) => props.theme.colors.dark};
    `}
`;

const StyledContent = styled.div`
    padding: 5px 10px;
`;

// TODO: when active, make editable
// Note that we need to implement a state dispatch from here on completion of editting text
function TextNode({ text, active, handleNodeClick }: TextNodeProps) {
  if(active==true){
    return (
      <StyledTextNode
        active={active.toString()}
        onClick={handleNodeClick}
      >
          <StyledContent>
            <textarea name="" id="" cols="30" rows="10">{text}</textarea>
            
          </StyledContent>
      </StyledTextNode>
    );
  }
  else{
    return (
      <StyledTextNode
        active={active.toString()}
        onClick={handleNodeClick}
      >
          <StyledContent>
   {text}
          </StyledContent>
      </StyledTextNode>
    );
  }
  
}

export default TextNode;
