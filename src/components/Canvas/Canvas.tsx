import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node } from "../../utils/DataStuctures";
import styled from "styled-components";
import TextColumn from "./TextColumn";

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

  const deleteTextBlock = () => {
    setTextBlocks(textBlocks.filter((block) => block.id !== activeNodeId));
    const newActiveNode = textBlocks.at(-2)?.id || null;
    setActiveNodeId(newActiveNode);
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock addBlock={addTextBlock} removeBlock={deleteTextBlock} />
      <TextColumn head={head} textBlocks={textBlocks} activeNodeId={activeNodeId} />
    </StyledCanvas>
  );
}

export default Canvas;
