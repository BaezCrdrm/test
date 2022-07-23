import * as React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { IFamily } from "../../../lib/data/definitions";
import FindAndSelectFamily from "../../findandselect/family";
import { IFormProps } from "../../utils/definitions";

interface IFormSelectFamilyProps extends IFormProps
{
    selectedFamily?: IFamily,
    onSelect: (family: IFamily) => void
}

const FormSelectFamily = (props: IFormSelectFamilyProps) => {
    const [selectedFamily, setSelectedFamily] = useState<IFamily | undefined>(props.selectedFamily);
    
    const [openSelectFamily, setOpenSelectFamily] = useState(false);

    const closeAndSelect = (value: any, setter: (args: any) => void, closer: (args: any) => void) => {
        setter(value);
        closer(false);
    }

    const closeModalsAndOpen = (setter: (args: any) => void) => {
        setOpenSelectFamily(val => val = false);
        setter(true);
    }

    const select = async() => {
        if(!selectedFamily) return;

        if(props.onSelect)
        {
            props.onSelect(selectedFamily);
            if(props.onClose)
            {
                alert(`Family "${selectedFamily.name}" selected`);
                props.onClose();
            }
        }
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
                    <Button title="Save"
                        variant="contained"
                        onClick={select} >
                        Select
                    </Button>
                    :
                    <div></div>
                }
            </div>

            <FindAndSelectFamily 
                open={openSelectFamily} 
                onSelect={(family) => closeAndSelect(family, setSelectedFamily, setOpenSelectFamily)}
                onCancel={() => setOpenSelectFamily(false)} />
        </form>
    )
}

export default FormSelectFamily;
