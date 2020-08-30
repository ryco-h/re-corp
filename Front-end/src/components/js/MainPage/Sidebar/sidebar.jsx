import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import "../../../css/sidebarKelasAmbil.css";
import icon from "../../../img/admin/Vector.png";
import pp from "../../../img/admin/pp.png";

export default function Sidebar() {

        return (
            <React.Fragment>
                    <div>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src={pp} />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Administrator"
                            secondary={
                                <React.Fragment>
                                {"andrycohut09@gmail.com"}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <ListItem button component='a' href='/tambahdata/'>
                            <ListItemIcon>
                                <img src={icon} alt="no-img"></img>
                            </ListItemIcon>
                            <ListItemText primary="Tambah Data Nasabah" />
                        </ListItem>
                        <ListItem button component='a' href='/tampildata/'>
                            <ListItemIcon>
                                <img src={icon} alt="no-img"></img>
                            </ListItemIcon>
                            <ListItemText primary="Data Nasabah" />
                        </ListItem>
                    </div>
            </React.Fragment>
        );
    }