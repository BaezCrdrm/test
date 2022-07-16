import * as React from "react";
import { useState, useEffect } from "react";
import { IFamily, IFamilyMember } from "../../../lib/data/definitions";
import FindAndSelect from "../base";

interface IFindAndSelectUserProps
{
    open: boolean,
    onSelect?: (family: IFamily) => void,
    onCancel?: () => void
}

const FindAndSelectFamily = (props: IFindAndSelectUserProps): JSX.Element => {
    const [selected, setSelected] = useState<IFamily>();

    useEffect(() => {
        if(!selected) return;
        if(props.onSelect)
            props.onSelect(selected);
    }, [selected]);

    return (
        <div>
            <FindAndSelect open={props.open} title="Family" 
                type="family"
                onSelected={setSelected}
                onCancel={props.onCancel}>
                {
                    selected ? 
                    <div>
                        <div>
                            <span className="font-semibold">Name: </span>
                            <span>{selected.name}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Notes: </span>
                            <span>{selected.notes}</span>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </FindAndSelect>
        </div>
    )
}

export default FindAndSelectFamily;
