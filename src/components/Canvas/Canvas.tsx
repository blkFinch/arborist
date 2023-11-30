import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, LinkedList } from "../../utils/DataStuctures";

function TextNode({ text, key }: { text: string; key: string }) {
  return <div key={key}>{text}</div>;
}

function Canvas() {
  const [textBlocks, setTextBlocks] = useState<Node<string>[]>([]);
  const [head, setHead] = useState<Node<string> | null>(null);

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    if (head === null) {
      setHead(newNode);
    }
    setTextBlocks([...textBlocks, newNode]);
  };

  const deleteTextBlock = (text: string) => {
    setTextBlocks(textBlocks.filter((block) => block.data !== text));
  };

  const renderTextBlocks = () => {
    if (head !== null) {
      return textBlocks.map((nodeData, i) => (
        <TextNode key={i.toString()} text={nodeData.data} />
      ));
    }
  };

  return (
    <>
      <h2>Canvas</h2>
      <TextBlock addBlock={addTextBlock} removeBlock={deleteTextBlock} />
      {renderTextBlocks()}
    </>
  );
}

export default Canvas;
