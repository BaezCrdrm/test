import * as React from "react";
import { useState, useEffect, Fragment} from "react";
import { TextField, Autocomplete as MaterialAutocomplete, CircularProgress } from "@mui/material";
import { DataType, IMember } from "../../lib/data/definitions";
import { searchMember, searchFamily, getFamilyMembers } from "../../lib/data";

interface IAutocompleteProps
{
    type: DataType,
    compId?: string,
    onSelect: (value: unknown) => void
}

async function search(type: DataType, value: string, compId?: string)
{
    try
    {
        switch (type) 
        {
            case "member":
                return await searchMember(value);
            break;

            case "family":
                return await searchFamily(value);
            break;
            
            case "memberfamily":
                return await getFamilyMembers(compId || "", value);
            break;
        
            default:
            break;
        }
    }
    catch(error)
    {
        console.error("search", error);
        return [];
    }
}

export function useDebounce(initialValue: string, delay: number): [string, any]
{
    const [actualValue, setActualValue] = useState<string>(initialValue);
    const [debounceValue, setDebounceValue] = useState<string>(initialValue);

    useEffect(() => {
        const id = setTimeout(() => setDebounceValue(actualValue), delay);
        return () => clearTimeout(id);
    }, [actualValue, delay]);

    return [debounceValue, setActualValue];
}

const Autocomplete = (props: IAutocompleteProps) => {
    const [searchValue, setSearchValue] = useDebounce("", 500);
    const [objProp, setObjProp] = useState<string>("name");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly any[]>([]);
    const [selected, setSelected] = useState();
    const loading = open && options.length === 0;

    useEffect(() => {
        if(props.type === "member")
            setObjProp("description");
    }, []);

    useEffect(() => {
        let active = true;
    
        if (!loading) {
            return undefined;
        }
    
        (async () => {
            try
            {
                const res = await search(props.type, searchValue, props.compId);
                setOptions(res || []);
            }
            catch(error)
            {
                console.warn("Could not get data", error);
                setOptions([]);
            }
        
            // if (active) {
            //     setOptions([]);
            // }
        })();
    
        return () => {
            active = false;
        };
    }, [searchValue]);
    
    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const select = (event: unknown, value: any, reason: unknown) => {
        if(props.onSelect)
        {
            // if(value.member)
            //     props.onSelect(value.member);
            // else
                props.onSelect(value);
        }
    }

    const getOptionLabel = (option: any) => {
        try
        {
            const val = option[objProp];
            if(!(typeof val === "string"))
            {
                const msg = "Value is not a string";
                console.warn(msg, val);
                throw new Error(msg);
            }
            return val;
        }
        catch(error)
        {
            if(option.member)
            {
                const m = option.member as IMember;
                const val = m.description;
                return val; 
            }
            else
            {
                console.error("Could not get label for ", option);
            }
            return "";
        }
    }

    return (
        <div className="w-full">
            <MaterialAutocomplete
                sx={{ width: "100%" }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => getOptionLabel(option) === value[objProp]}
                getOptionLabel={(option) => getOptionLabel(option)}
                options={options}
                loading={loading}
                onChange={select}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Asynchronous"
                        onChange={c => setSearchValue(c.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}

export default Autocomplete;
