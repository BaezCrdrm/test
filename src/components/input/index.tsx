import { Input as InputMaterial } from "@mui/material";

interface IInputProps
{
    title: string,
    name?: string,
    type?: "text",
    onBlur?: (data: any) => void
    onChange?: (data: any) => void
}

const Input = (props: IInputProps) => {
    return (
        <div className="flex flex-col items-center text-left py-1 text-gray-200">
            <label className="w-full text-sm">{props.title}</label>
            <InputMaterial placeholder={props.title} 
                style={{
                    color: "white",
                    borderColor: "white"
                }}
                onBlur={props.onBlur}
                onChange={props.onChange} 
            />
        </div>
    )
}

export default Input;
