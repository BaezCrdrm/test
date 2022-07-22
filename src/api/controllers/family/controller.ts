import logger from "../../../logger";
import { IFindData } from "../../../definitions";
import { family as Family, familyAttributes } from "../../../db/models/family";
import { getErrorMessage } from "../../../utils/errorMessage";

export async function getAllFamilies(): Promise<IFindData<Family[]>>
{
    let status = 200;
    try
    {
        const resp = await Family.findAll();
        logger.debug("Familys", resp);

        if(!resp)
        {
            status = 404;
            throw new Error("Could not find any values");
        }

        return {
            status: status,
            response: {
                success: true,
                data: resp
            }
        }
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        return {
            status: status,
            response: {
                success: false,
                error: msg
            }
        }
    }
}

export async function getFamily(id: string): Promise<IFindData<Family>>
{
    let status = 200;
    try
    {
        const resp = await Family.findOne({ where: { id: id } });
        logger.debug("Family", resp);

        if(!resp)
        {
            status = 404;
            throw new Error(`Could not find any value with id ${id}`);
        }

        return {
            status: status,
            response: {
                success: true,
                data: resp
            }
        }
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        return {
            status: status,
            response: {
                success: false,
                error: msg
            }
        }
    }
}

export async function createFamily(family: familyAttributes): Promise<IFindData<familyAttributes>>
{
    let status = 200;
    try
    {
        const resp = await Family.create(family);
        logger.debug("Family", resp);

        if(!resp)
        {
            status = 400;
            const msg = "Could not create family";
            logger.error(msg, family);
            throw new Error(msg);
        }

        return {
            status: status,
            response: {
                success: true,
                data: resp.toJSON()
            }
        }
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        return {
            status: status,
            response: {
                success: false,
                error: msg
            }
        }
    }
}

export async function updateFamily(id: string, family: familyAttributes): Promise<IFindData<familyAttributes>>
{
    let status = 200;
    try
    {
        if(!family.id) family.id = id;
        else if(id !== family.id) 
        {
            status = 400;
            throw new Error("The payload id is not equals to the API update id");
        }
        
        const resp = await Family.update(family, { where: { id: id }});
        logger.debug("Family", resp);

        if(!(Array.isArray(resp) && resp.length > 0 && resp[0] == 1))
        {
            status = 400;
            const msg = "Could not update family. Verify the object values and if it is not equals to the old object";
            logger.error(msg, family);
            throw new Error(msg);
        }

        return {
            status: status,
            response: {
                success: true,
                data: family
            }
        }
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        return {
            status: status,
            response: {
                success: false,
                error: msg
            }
        }
    }
}
