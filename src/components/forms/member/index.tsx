import * as React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Input from "../../input";
import FindAndSelectFamily from "../../findandselect/family";
import { IFamily } from "../../../lib/data/definitions";

const FormMember = () => {
    const [selectedFamily, setSelectedFamily] = useState<IFamily>();
    const [openSelectFamily, setOpenSelectFamily] = useState(false);
    const closeAndSelect = (value: any, setter: (args: any) => void, closer: (args: any) => void) => {
        setter(value);
        closer(false);
    }
    
    return (
        <form>
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
                onClick={() => setOpenSelectFamily(true)} >
                Select family
            </Button>

            {
                selectedFamily ? 
                <div>
                    <Input title="Description" name="description" />
                    <div className="my-4 text-white">
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2000-05-24"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <Input title="Avatar URL" name="avatar" />

                    <div className="mt-4">
                        <Button title="Save" variant="contained" style={{
                            outlineColor: "white"
                        }}>
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
        </form>
    )
}

export default FormMember;
