import React from "react";
import { useState } from "react";
import MaterialSpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HowToRegIcon from '@mui/icons-material/HowToReg';

interface ISpeeddialProps
{
    onItemClicked?: (id: number) => void
}

const actions = [
    { icon: <PersonIcon />, name: "New member", id: 1 },
    { icon: <GroupsIcon />, name: "New Family", id: 2 },
    { icon: <ConnectWithoutContactIcon />, name: "Relate with", id: 3 },
    { icon: <HowToRegIcon />, name: "Select family", id: 4 }
  ];

const SpeedDial = (props: ISpeeddialProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const itemClicked = (id: number) => {
        if(props.onItemClicked)
            props.onItemClicked(id);
        handleClose();
    }

    return (
        <MaterialSpeedDial
            ariaLabel="SpeedDial menu"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => itemClicked(action.id)}
            />
            ))}
        </MaterialSpeedDial>
    )
}

export default SpeedDial;
