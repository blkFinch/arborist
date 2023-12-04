import { useState } from "react";
import TextBlock from "./TextBlock";
import { Node, Stem } from "../../utils/DataStuctures";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";

const StyledCanvas = styled.div`
  margin: 20px;
`;

function Canvas() {
  // TODO: implement state management and use that for nodes
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeStem, setActiveStem] = useState<Stem<string>>(new Stem());
  const [stems, setStems] = useState<Stem<string>[]>([activeStem]);
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  //used to force re-render of component ffrom https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render/53837442#53837442

  const addTextBlock = (text: string) => {
    const newNode = new Node(text);
    activeStem.addNode(newNode);
    setActiveNodeId(newNode.id);
  };

  //This logic feels loose to me- make sure we cant delete a stem that still has nodes
  // TODO: getting null pointer error when deleting last node in stem -- fix this method
  const deleteTextBlock = () => {
    activeStem.removeNode(activeNodeId);

    //Clean up stem if empty
    if (activeStem.tail === null) {
      const newStems = stems.filter((stem) => stem !== activeStem);
      console.log("stems", stems);
      console.log("newStems", newStems);
      setStems(newStems);
      const newStem = newStems[newStems.length - 1];
      console.log("stems empty setting new stem", newStem);
      console.log("stems", stems);
      setActiveStem(newStem);
      setActiveNodeId(newStem.tail?.id || null);
      //do we need to delete the old stem?
    } else {
      const prev = activeStem.getNode(activeNodeId)?.prev;
      const newActive = prev ? prev.id : activeStem.tail?.id;
      setActiveNodeId(newActive || null);
    }
    //Always make sure there is at least one stem
    if (stems.length < 1) {
      setStems([new Stem()]);
      setActiveStem(stems[0]);
    }
  };

  const addChild = (text: string) => {
    const active = activeStem.getNode(activeNodeId);
    const childNode = new Node(text);
    active?.addChild(childNode);
    // TODO: check if active stem has next? if not, create new stem
    const newStem: Stem<string> = new Stem();
    newStem.addNode(childNode);
    setStems([...stems, newStem]);
    setActiveStem(newStem);
    setActiveNodeId(childNode.id);
    console.log(stems);
    // then organize child into next col
    // perhaps use an array of activeStems ?? or a linked list of stems??
    // question: how do we sort the child into position of the next stem?
    //            it should be by order of parent node, and then by add order?
  };

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
    //I think each node needs to know its stem to make this easier
    // consider giving each stem an id
    setActiveStem(stems.find((stem) => stem.getNode(id) !== undefined)!); 
  };

  return (
    <StyledCanvas>
      <h2>Canvas</h2>
      <TextBlock
        addBlock={addTextBlock}
        removeBlock={deleteTextBlock}
        addChild={addChild}
      />

      <ColumnContainer
        stems={stems}
        activeNodeId={activeNodeId}
        handleNodeClick={handleNodeClick}
      />
    </StyledCanvas>
  );
}

export default Canvas;
