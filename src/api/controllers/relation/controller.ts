import logger from "../../../logger";
import { IFindData } from "../../../definitions";
import { relation as Relation, relationAttributes } from "../../../db/models/relation";
import { getErrorMessage } from "../../../utils/errorMessage";

export async function getAllRelations(): Promise<IFindData<Relation[]>>
{
    let status = 200;
    try
    {
        const resp = await Relation.findAll();
        logger.debug("Relations", resp);

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

export async function getRelation(id: string): Promise<IFindData<Relation>>
{
    let status = 200;
    try
    {
        const resp = await Relation.findOne({ where: { id: id } });
        logger.debug("Relation", resp);

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

export async function createRelation(relation: relationAttributes): Promise<IFindData<relationAttributes>>
{
    let status = 200;
    try
    {
        const resp = await Relation.create(relation);
        logger.debug("Relation", resp);

        if(!resp)
        {
            status = 400;
            const msg = "Could not create relation";
            logger.error(msg, relation);
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

export async function updateRelation(id: string, relation: relationAttributes): Promise<IFindData<relationAttributes>>
{
    let status = 200;
    try
    {
        if(!relation.id) relation.id = id;
        else if(id !== relation.id) 
        {
            status = 400;
            throw new Error("The payload id is not equals to the API update id");
        }
        
        const resp = await Relation.update(relation, { where: { id: id }});
        logger.debug("Relation", resp);

        if(!(Array.isArray(resp) && resp.length > 0 && resp[0] == 1))
        {
            status = 400;
            const msg = "Could not update relation. Verify the object values and if it is not equals to the old object";
            logger.error(msg, relation);
            throw new Error(msg);
        }

        return {
            status: status,
            response: {
                success: true,
                data: relation
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
