import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import { useState } from "react";
import { IFamily, IFamilyMember, IRelation } from "../../../lib/data/definitions";
import FindAndSelectFamily from "../../findandselect/family";
import FindAndSelectMembers from "../../findandselect/members";
import { IFormProps } from "../../utils/definitions";
import { postRelation } from "../../../lib/data";
import Store from "../../../lib/manager";

const FormRelation = (props: IFormProps) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [selectedFamily, setSelectedFamily] = useState<IFamily | undefined>(Store.selectedFamily);
    const [selectedFirstMember, setSelectedFirstMember] = useState<IFamilyMember>();
    const [selectedSecondMember, setSelectedSecondMember] = useState<IFamilyMember>();
    
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

    const relate = async() => {
        if(isSaving) return;
        if(!validate()) return;
        if(!selectedFirstMember) return;
        if(!selectedSecondMember) return;
        if(!selectedFamily) return;
        
        let relation: IRelation | undefined;

        try
        {
            setIsSaving(s => s = true);
            relation = {
                familyMember1: selectedFirstMember,
                familyMember2: selectedSecondMember
            }
            
            relation = await postRelation(relation);
            
            if(relation && relation.id)
            {
                const msg = "Relation has been made";
                console.log(msg, relation);
                window.dispatchEvent(new CustomEvent("new_relation_added", {
                    detail: {relation}
                }));
                alert(msg);
            }

            if(props.onClose)
                props.onClose();
        }
        catch(error)
        {
            console.error("save", error);
            alert("Could not add a new member");
        }

        setIsSaving(s => s = false);
    }

    return (
        <form>
            <div className="my-4 grid gap-2">
                <div className="flex flex-col">
                    {
                        selectedFamily ?
                        <div>
                            <span>Selected family: </span>
                            <span>{selectedFamily.name}</span>
                        </div>
                        :
                        <div></div>
                    }
                    {/* <Button title="Family"
                        variant="contained"
                        onClick={() => closeModalsAndOpen(setOpenSelectFamily)} >
                        Select family
                    </Button> */}
                </div>

                {
                    selectedFamily ? 
                    <div>
                        <div className="flex flex-col">
                            {
                                selectedFirstMember ?
                                <div>
                                    <span>Selected </span>
                                    <span>{selectedFirstMember.member?.description}</span>
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
                                    <span>{selectedSecondMember.member?.description}</span>
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
