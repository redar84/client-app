import React from "react";
import {Container,Button, Menu} from "semantic-ui-react";

interface Props{
  handleFormOpen : () => void; 
}
const NavBar = ({handleFormOpen}: Props) => {
  return (
    <div>
    <Menu inverted fixed="top">
        <Container>
        <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" title="MakeAndSell" style={{marginRight: '10px'}}/>
                    Make And Sell
           </Menu.Item>
           <Menu.Item name="Activities"/>
           <Menu.Item>
                    <Button positive content='Create Activity' 
                            onClick={()=>handleFormOpen()}/>
           </Menu.Item>
      </Container>
    </Menu>
    </div>
  );
};

export default NavBar;
