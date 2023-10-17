import { useState } from "react";
import styled from "styled-components";
import { MenuIcon } from "../icons/menuIcon";

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

const TitleLink = styled.a`
  font-size: 22px;
`;

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  }

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
            <TitleLink onClick={toggleDropdown}>Arborist</TitleLink>
          </li>
        </Navlist>
        {openDropdown ? <div>Is Open</div> : <div>Is Closed</div>}
      </div>
    </>
  );
}

export default Navbar;
