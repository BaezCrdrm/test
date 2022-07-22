import logger from "../../../logger";
import { IFindData } from "../../../definitions";
import { family as Family, familyAttributes } from "../../../db/models/family";
import { getErrorMessage } from "../../../utils/errorMessage";
import { FindOptions, Op } from "sequelize";

export async function getAllFamilies(searchName?: string): Promise<IFindData<Family[]>>
{
    let status = 200;
    try
    {
        let filter: FindOptions | undefined = undefined;
        if(searchName)
        {
            filter = { 
                where: { 
                    name: { 
                        [Op.like]: `%${searchName.trim()}%` 
                    }
                } 
            }
        }
        const resp = await Family.findAll(filter);
        logger.debug("Families", resp);

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

export async function deleteFamily(id: string): Promise<IFindData<boolean>>
{
    let status = 200;
    try
    {        
        const resp = await Family.destroy({ where: { id: id }});
        logger.debug("Family", resp);

        if(!(resp && resp === 1))
        {
            status = 400;
            const msg = "Could not delete family. Verify the object values and if it is not equals to the old object";
            logger.error(msg, id);
            throw new Error(msg);
        }

        return {
            status: status,
            response: {
                success: true,
                data: true
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
