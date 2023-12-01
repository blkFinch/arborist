import { useState } from "react";
import TextBlock from "./TextBlock";
import TextNode from "./TextNode";
import { Node } from "../../utils/DataStuctures";
import styled from "styled-components";

const StyledCanvas = styled.div`
  margin: 20px;
`;


function Canvas() {
  const [textBlocks, setTextBlocks] = useState<Node<string>[]>([]);
  const [head, setHead] = useState<Node<string> | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    if (head === null) {
      setHead(newNode);
    }
    setTextBlocks([...textBlocks, newNode]);
    setActiveNodeId(newNode.id);
  };

  const deleteTextBlock = (text: string) => {
    setTextBlocks(textBlocks.filter((block) => block.data !== text));
  };

  // TODO: refactor into component
  const renderTextBlocks = () => {
    if (head !== null) {
      return textBlocks.map((nodeData) => (
        <TextNode key={nodeData.id} text={nodeData.data} active={(nodeData.id === activeNodeId)}/>
      ));
    }
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock addBlock={addTextBlock} removeBlock={deleteTextBlock} />
      {renderTextBlocks()}
    </StyledCanvas>
  );
}

export default Canvas;
