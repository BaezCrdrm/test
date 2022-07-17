import * as React from "react";
import { useState, useEffect } from "react";
import { IFamilyMember, IMember } from "../../../lib/data/definitions";
import FindAndSelect from "../base";
import { format } from "date-fns"

interface IFindAndSelectUserProps
{
    open: boolean,
    family?: string,
    onSelect?: (member: IMember | IFamilyMember) => void,
    onCancel?: () => void
}

const FindAndSelectMembers = (props: IFindAndSelectUserProps): JSX.Element => {
    const [selected, setSelected] = useState<IMember>();

    useEffect(() => {
        if(!selected) return;
        if(props.onSelect)
            props.onSelect(selected);
    }, [selected]);

    return (
        <div>
            <FindAndSelect open={props.open} title={props.family ? "Family member" : "Member"}
                type={props.family ? "memberfamily" : "member"}
                compId={props.family}
                onSelected={setSelected}
                onCancel={props.onCancel}>
                {
                    selected ? 
                    <div>
                        <div>
                            <span className="font-semibold">Name: </span>
                            <span>{selected.description}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Birthday: </span>
                            <span>{format(
                                typeof selected.birthday == "string" ? 
                                    new Date(selected.birthday) : 
                                    selected.birthday as Date, 
                                "dd/MM/yyyy"
                            )}</span>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </FindAndSelect>
        </div>
    )
}

export default FindAndSelectMembers;
