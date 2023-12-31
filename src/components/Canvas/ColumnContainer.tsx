import TextColumn from "./TextColumn";
import styled from "styled-components";
import { selectBranches } from "../../store/Document";
import { useAppSelector } from "../../hooks";

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

interface ColumnContainerProps {
  handleNodeClick: (id: string) => void;
}

function ColumnContainer({ handleNodeClick }: ColumnContainerProps) {
  // selectBranches takes in the document state and returns an array of branches
  // So we need to useAppSelector to get the document state
  // I wonder if we can abstract this into a hook?
  const columns = selectBranches(useAppSelector((state) => state.document));

  console.log(columns);
  return (
    <StyledColumnContainer>
      {columns.map((column, i) => (
        <TextColumn key={i} handleNodeClick={handleNodeClick} nodes={column} />
      ))}
    </StyledColumnContainer>
  );
}

export default ColumnContainer;
