import { Stem } from "../../utils/DataStuctures";
import TextColumn from "./TextColumn";
import styled from "styled-components";

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

interface ColumnContainerProps {
  stems: Stem<string>[];
  activeNodeId: string | null;
  handleNodeClick: (id: string) => void;
}

function ColumnContainer({
  stems,
  activeNodeId,
  handleNodeClick,
}: ColumnContainerProps) {
  return (
    <StyledColumnContainer>
      {stems.map((stem, i) => (
        <TextColumn
          key={i}
          tail={stem.tail}
          textBlocks={stem.getAllNodes()}
          activeNodeId={activeNodeId}
          handleNodeClick={handleNodeClick}
        />
      ))}
    </StyledColumnContainer>
  );
}

export default ColumnContainer;
