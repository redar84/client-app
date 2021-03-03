import React from "react";
import { NavLink } from "react-router-dom";
import {Container,Button, Menu} from "semantic-ui-react";

export default function NavBar(){
  
  return (
    <>
    <Menu inverted fixed="top">
        <Container>
        <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" title="MakeAndSell" style={{marginRight: '10px'}}/>
                    Make And Sell
           </Menu.Item>
           <Menu.Item name="Activities" as={NavLink} to='/activities'/>
           <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity'/>
           </Menu.Item>
      </Container>
    </Menu>
    </>
  );
};

