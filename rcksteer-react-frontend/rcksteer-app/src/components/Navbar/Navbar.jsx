import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { mainNavbarItems } from './consts/navbarListItems';

import {useParams, useNavigate} from 'react-router-dom'


const Navbar = () => {
    const drawerWidth = 240;

    const navigate = useNavigate();


  return (
    <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        }}
        variant="permanent"
        anchor="left"
    >
        <Toolbar />
        <Divider />
        <List>
        {mainNavbarItems.map((item) => (
            <ListItem                
                key={item.id}                
                disablePadding                               
                onClick={() => navigate(item.route)}
            >
            <ListItemButton 
                // onClick={() => navigate(item.route)}                
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>        
    </Drawer>
  )
}

export default Navbar