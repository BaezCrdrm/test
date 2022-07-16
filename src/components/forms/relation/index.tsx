import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import { useState, useEffect } from "react";
import { IFamily, IMember } from "../../../lib/data/definitions";
import FindAndSelectFamily from "../../findandselect/family";
import FindAndSelectMembers from "../../findandselect/members";

interface IAlertData
{
    level: "error" | "warning" | "info" | "success";
    data: string
}

const FormRelation = () => {
    const [selectedFamily, setSelectedFamily] = useState<IFamily>();
    const [selectedFirstMember, setSelectedFirstMember] = useState<IMember>();
    const [selectedSecondMember, setSelectedSecondMember] = useState<IMember>();
    
    const [openSelectFamily, setOpenSelectFamily] = useState(false);
    const [openSelectFirstMember, setOpenSelectFirstMember] = useState(false);
    const [openSelectSecondMember, setOpenSelectSecondMember] = useState(false);

    const [openSb, setOpenSb] = useState(false);
    const [mgSb, setMsgSb] = useState("");

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSb(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const closeAndSelect = (value: any, setter: (args: any) => void, closer: (args: any) => void) => {
        setter(value);
        closer(false);
    }

    const closeModalsAndOpen = (setter: (args: any) => void) => {
        setOpenSelectFamily(val => val = false);
        setOpenSelectFirstMember(val => val = false);
        setOpenSelectSecondMember(val => val = false);
        setter(true);
    }

    const validate = () => {
        if(!(selectedFamily && selectedFirstMember && selectedSecondMember))
            return validationError("Please select all fields");
        return true;
    }

    const validationError = (msg: string) => {
        setMsgSb(m => m = msg)
        setOpenSb(true);
        return false;
    }

    const relate = () => {
        if(!validate()) return;


    }

    return (
        <form>
            <div className="my-4 grid gap-2">
                <div className="flex flex-col">
                    {
                        selectedFamily ?
                        <div>
                            <span>Selected </span>
                            <span>{selectedFamily.name}</span>
                        </div>
                        :
                        <div></div>
                    }
                    <Button title="Family"
                        variant="contained"
                        onClick={() => closeModalsAndOpen(setOpenSelectFamily)} >
                        Select family
                    </Button>
                </div>

                {
                    selectedFamily ? 
                    <div>
                        <div className="flex flex-col">
                            {
                                selectedFirstMember ?
                                <div>
                                    <span>Selected </span>
                                    <span>{selectedFirstMember.description}</span>
                                </div>
                                :
                                <div></div>
                            }
                            <Button title="First member"
                                variant="contained"
                                onClick={() => closeModalsAndOpen(setOpenSelectFirstMember)} >
                                Select member
                            </Button>
                        </div>
                        <div className="flex flex-col">
                            {
                                selectedSecondMember ?
                                <div>
                                    <span>Selected </span>
                                    <span>{selectedSecondMember.description}</span>
                                </div>
                                :
                                <div></div>
                            }
                            <Button title="Second member"
                                variant="contained"
                                onClick={() => closeModalsAndOpen(setOpenSelectSecondMember)} >
                                Select member
                            </Button>
                        </div>
                    </div>
                    :
                    <div></div>
                }

                {
                    selectedFamily && selectedFirstMember && selectedSecondMember ?
                    <Button title="Save"
                        variant="contained"
                        onClick={relate} >
                        Relate
                    </Button>
                    :
                    <div></div>
                }
            </div>

            <FindAndSelectFamily 
                open={openSelectFamily} 
                onSelect={(family) => closeAndSelect(family, setSelectedFamily, setOpenSelectFamily)}
                onCancel={() => setOpenSelectFamily(false)} />
            <FindAndSelectMembers 
                open={openSelectFirstMember} 
                family={selectedFamily?.id} 
                onSelect={(member) => closeAndSelect(member, setSelectedFirstMember, setOpenSelectFirstMember)}
                onCancel={() => setOpenSelectFirstMember(false)} />
            <FindAndSelectMembers 
                open={openSelectSecondMember} 
                family={selectedFamily?.id} 
                onSelect={(member) => closeAndSelect(member, setSelectedSecondMember, setOpenSelectSecondMember)}
                onCancel={() => setOpenSelectSecondMember(false)} />

            <Snackbar
                open={openSb}
                autoHideDuration={6000}
                onClose={handleClose}
                message={mgSb}
                action={action}
            />
        </form>
    )
}

export default FormRelation;
