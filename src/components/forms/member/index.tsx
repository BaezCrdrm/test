import * as React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Input from "../../input";
import FindAndSelectFamily from "../../findandselect/family";
import { IFamily, IFamilyMember, IMember } from "../../../lib/data/definitions";
import { postMember, postMemberToFamily, updateFamilyMember } from "../../../lib/data";
import { IFormProps } from "../../utils/definitions";
import FindAndSelectMembers from "../../findandselect/members";
import Store from "../../../lib/manager";

const FormMember = (props: IFormProps) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [selectedFamily, setSelectedFamily] = useState<IFamily | undefined>(Store.selectedFamily);
    const [openSelectFamily, setOpenSelectFamily] = useState(false);
    const [selectedParent, setSelectedParent] = useState<IFamilyMember>();
    const [openSelectParent, setOpenSelectParent] = useState(false);
    const closeAndSelect = (value: any, setter: (args: any) => void, closer: (args: any) => void) => {
        setter(value);
        closer(false);
    }

    const [avatar, setAvatar] = useState<string>();
    const [birthday, setBirthday] = useState<Date>(new Date("2000-05-24"));
    const [description, setDescription] = useState<string>();

    const save = async() => {
        if(isSaving) return;
        if(!description) return;
        if(!selectedFamily) return;

        let member: IMember | undefined;

        try
        {
            setIsSaving(s => s = true);
            member = {
                avatar: avatar || "",
                birthday: birthday,
                description: description
            }
            
            member = await postMember(member);
            let familyMember;
            
            if(member && member.id)
            {
                familyMember = await addToFamily(member, selectedFamily);
                console.log("Member in family", familyMember);

                const msg = "Member has been created";
                console.log(msg, member);
                alert(msg);
            }

            if(selectedParent && familyMember)
            {
                const fr = Store.relations
                    .find(r => r.familyMember1?.id === selectedParent.id || 
                        r.familyMember2?.id === selectedParent.id);
                if(fr)
                {
                    console.log("save", fr);
                    familyMember.rel_parent_id = fr.id;
                    familyMember = await updateFamilyMember(familyMember);
                    if(!familyMember?.rel_parent_id)
                    {
                        const msg = "Could not add member as a child";
                        console.error(msg, familyMember);
                        alert(msg);
                    }
                }
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

    const addToFamily = async(member: IMember, family: IFamily) => {
        if(!family?.id) throw new Error("Could not get Family ID");
        return await postMemberToFamily(family.id, member)
    }

    const setDate = (e: any) => {
        setBirthday(new Date(e.target.value));
    }

    const closeModalsAndOpen = (setter: (args: any) => void) => {
        setOpenSelectFamily(val => val = false);
        setOpenSelectParent(val => val = false);
        setter(true);
    }
    
    return (
        <form>
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
                onClick={() => setOpenSelectFamily(true)} >
                Select family
            </Button> */}

            {
                selectedFamily ? 
                <div>
                    <Input title="Description" name="description" onChange={e => setDescription(e.target.value)} />
                    <div className="my-4 text-white">
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2000-05-24"
                            sx={{ width: 220 }}
                            onChange={setDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <Input title="Avatar URL" name="avatar" onChange={e => setAvatar(e.target.value)} />

                    <div className="mt-4">
                        {
                            selectedParent ?
                            <div>
                                <span>Selected </span>
                                <span>{selectedParent.member?.description}</span>
                            </div>
                            :
                            <div></div>
                        }
                        <Button title="Parent"
                            variant="contained"
                            onClick={() => closeModalsAndOpen(setOpenSelectParent)} >
                            Select parent (optional)
                        </Button>
                    </div>

                    <div className="mt-4">
                        <Button title="Save" variant="contained" style={{
                            outlineColor: "white"
                            }}
                            onClick={save}>
                            Save
                        </Button>
                    </div>
                </div>
                :
                <div></div>
            }

            <FindAndSelectFamily 
                open={openSelectFamily} 
                onSelect={(family) => closeAndSelect(family, setSelectedFamily, setOpenSelectFamily)}
                onCancel={() => setOpenSelectFamily(false)} />
            <FindAndSelectMembers 
                open={openSelectParent} 
                family={selectedFamily?.id} 
                onSelect={(member) => closeAndSelect(member, setSelectedParent, setOpenSelectParent)}
                onCancel={() => setOpenSelectParent(false)} />
        </form>
    )
}

export default FormMember;
