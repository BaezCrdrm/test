import * as React from "react";
import { useState, useEffect } from "react";
import { DataType } from "../../../lib/data/definitions";
import Autocomplete from "../../autocomplete";
import Modal from "../../modal";
import { Avatar, Box, Button } from "@mui/material";

interface IFindAndSelectProps
{
    open: boolean,
    title: string,
    type: DataType,
    children: JSX.Element,
    compId?: string,
    onSelected?: (...args: any[]) => void,
    onOk?: () => void,
    onCancel?: () => void
}

const FindAndSelect = (props: IFindAndSelectProps): JSX.Element => {
    const [avatar, setAvatar] = useState();
    const [item, setItem] = useState();

    useEffect(() => {
        if(!props.onSelected) return;
        props.onSelected(item);

        if((item as any)?.avatar)
        {
            setAvatar((item as any).avatar);
        }
    }, [item]);

    const cancel = () => {
        setItem(undefined);
        if(!props.onCancel) return;
            props.onCancel();
    }

    return (
        <Modal open={props.open} title={props.title}>
            <div className="flex flex-col">
                <div className="w-full">
                    <Autocomplete 
                        type={props.type} 
                        onSelect={(v: any) => setItem(v)}
                        compId={props.compId} />
                </div>

                <div className="w-full flex">
                    <Box style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 0px"
                    }}>
                        {
                            item && props.type === "member" &&
                            <Avatar variant="square" src={avatar} />
                        }
                        <Box style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: props.type === "member" ? "12px" : 0
                        }}>
                            {props.children}
                        </Box>
                    </Box>
                </div>

                <Box>
                    <Button title="Save" 
                        variant="contained" 
                        style={{
                        outlineColor: "white"
                        }}
                        onClick={props.onOk} >
                        Ok
                    </Button>
                    <Button title="Cancel"
                        style={{
                            outlineColor: "white"
                        }}
                        onClick={cancel} >
                        Cancel
                    </Button>
                </Box>
            </div>
        </Modal>
    )
}

export default FindAndSelect;
