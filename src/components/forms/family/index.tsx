import * as React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import Input from "../../input";
import { postFamily } from "../../../lib/data";
import { IFamily } from "../../../lib/data/definitions";
import { IFormProps } from "../../utils/definitions";

const FormFamily = (props: IFormProps) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [notes, setNotes] = useState<string>("");

    const save = async() => {
        if(isSaving) return;
        if(!name) return;

        let family: IFamily | undefined;

        try
        {
            setIsSaving(s => s = true);
            family = {
                name: name.trim(), 
                notes: notes
            }
            family = await postFamily(family);

            if(family && family.id)
            {
                const msg = "Familia agregada";
                console.log(msg, family);
                alert(msg);
            }

            if(props.onClose)
                props.onClose();
        }
        catch(error)
        {
            console.error("save", error);
            alert("Could not add a new family");
        }

        setIsSaving(s => s = false);
    }

    return (
        <form>
            <Input title="Name" name="name" onChange={e => setName(e.target.value)} />
            <Input title="Notes" name="notes" onChange={e => setNotes(e.target.value)} />

            <div className="mt-4">
                <Button title="Save" variant="contained" style={{
                        outlineColor: "white"
                    }}
                    onClick={save}>
                    Save
                </Button>
            </div>
        </form>
    )
}

export default FormFamily;
