import styled from "styled-components";
import { MenuIcon } from "../icons/menuIcon";
import Dropdown  from "./Dropdown"

const Navlist = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;


li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
`;

function Navbar() {

  return (
    <>
      <div className="topnav">
        <Navlist>
          <li>
            <a>
              <MenuIcon />
            </a>
          </li>
          <li>
            <Dropdown text="Arborist"/>
          </li>
        </Navlist>
      </div>
    </>
  );
}

export default Navbar;
