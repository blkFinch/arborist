import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from "styled-components";

interface Props{
    text: string;
}

const MenuItem = styled(DropdownMenu.Item)`
font-size: 16px;
line-height: 1;
color: var(--violet-11);
border-radius: 3px;
display: flex;
align-items: center;
height: 25px;
padding: 0 5px;
position: relative;
padding-left: 25px;
user-select: none;
outline: none;
`

const MenuContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
`

const TitleLink = styled.a`
  font-size: 22px;
`;

function Dropdown(props: Props){


    return(
        <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild={true}>
          <TitleLink>{props.text}</TitleLink>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <MenuContent>
            <MenuItem>
              Outline View
            </MenuItem>
            <MenuItem>
              Export
            </MenuItem>
            <MenuItem>
              Help
            </MenuItem>
            <MenuItem>
              Hotkeys
            </MenuItem>
          </MenuContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
}

export default Dropdown