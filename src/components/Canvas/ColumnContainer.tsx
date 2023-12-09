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
  handleNodeClick: (id: string) => void;
}

function ColumnContainer({
  stems,
  handleNodeClick,
}: ColumnContainerProps) {
  return (
    <StyledColumnContainer>
      {stems.map((stem, i) => (
        <TextColumn
          key={i}
          handleNodeClick={handleNodeClick}
        />
      ))}
    </StyledColumnContainer>
  );
}

export default ColumnContainer;
