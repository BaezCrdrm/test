import logger from "../logger";

export function getErrorMessage(error: unknown): string | undefined
{
    if(!error) return undefined;
    if(typeof error === "object")
    {
        if((error as any).message) return (error as any).message;
        logger.error("getErrorMessage", error);
    }
    else if(typeof error === "string") return error;
    return undefined;
}
