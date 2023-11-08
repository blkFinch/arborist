import { useState, ReactElement } from "react";
import { Button } from "@radix-ui/themes";
import TextBlock from "./TextBlock";


function Canvas() {

  const [textBlocks, setTextBlocks] = useState<ReactElement[]>([]);

  //TODO: make this work so that the child button will always add a new text block under the parent
  const addTextBlock = () => {
    setTextBlocks([...textBlocks, <TextBlock addBlock={addTextBlock}/>]);
  }

  return (
    <>
      <Button>Let's go from radix</Button>
      <TextBlock addBlock={addTextBlock}/>
      {textBlocks}
    </>
  );
}

export default Canvas;
