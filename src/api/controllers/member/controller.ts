import logger from "../../../logger";
import { IFindData } from "../../../definitions";
import { member as Member, memberAttributes } from "../../../db/models/member";
import { getErrorMessage } from "../../../utils/errorMessage";
import { FindOptions, Op } from "sequelize";

export async function getAllMembers(searchName?: string): Promise<IFindData<Member[]>>
{
    let status = 200;
    try
    {
        let filter: FindOptions | undefined = undefined;
        if(searchName)
        {
            filter = { 
                where: { 
                    description: { 
                        [Op.like]: `%${searchName.trim()}%` 
                    }
                } 
            }
        }
        const resp = await Member.findAll(filter);
        logger.debug("Members", resp);

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

export async function getMember(id: string): Promise<IFindData<Member>>
{
    let status = 200;
    try
    {
        const resp = await Member.findOne({ where: { id: id } });
        logger.debug("Member", resp);

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

export async function createMember(member: memberAttributes): Promise<IFindData<memberAttributes>>
{
    let status = 200;
    try
    {
        const resp = await Member.create(member);
        logger.debug("Member", resp);

        if(!resp)
        {
            status = 400;
            const msg = "Could not create member";
            logger.error(msg, member);
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

export async function updateMember(id: string, member: memberAttributes): Promise<IFindData<memberAttributes>>
{
    let status = 200;
    try
    {
        if(!member.id) member.id = id;
        else if(id !== member.id) 
        {
            status = 400;
            throw new Error("The payload id is not equals to the API update id");
        }
        
        const resp = await Member.update(member, { where: { id: id }});
        logger.debug("Member", resp);

        if(!(Array.isArray(resp) && resp.length > 0 && resp[0] == 1))
        {
            status = 400;
            const msg = "Could not update member. Verify the object values and if it is not equals to the old object";
            logger.error(msg, member);
            throw new Error(msg);
        }

        return {
            status: status,
            response: {
                success: true,
                data: member
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

export async function deleteMember(id: string): Promise<IFindData<boolean>>
{
    let status = 200;
    try
    {        
        const resp = await Member.destroy({ where: { id: id }});
        logger.debug("Member", resp);

        if(!(resp && resp === 1))
        {
            status = 400;
            const msg = "Could not update member. Verify the object values and if it is not equals to the old object";
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
