import { Button } from "@mui/material";
import * as React from "react";
import Input from "../../input";

const FormFamily = () => {
    return (
        <form>
            <Input title="Name" name="name" />
            <Input title="Notes" name="notes" />

            <div className="mt-4">
                <Button title="Save" variant="contained" style={{
                    outlineColor: "white"
                }}>
                    Save
                </Button>
            </div>
        </form>
    )
}

export default FormFamily;
