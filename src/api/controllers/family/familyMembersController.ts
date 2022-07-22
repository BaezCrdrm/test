import logger from "../../../logger";
import { IFindData } from "../../../definitions";
import { family_members as FamilyMembers, family_membersAttributes as familyMembersAttributes } from "../../../db/models/family_members";
import { getErrorMessage } from "../../../utils/errorMessage";
import { family as Family } from "../../../db/models/family";
import { memberAttributes } from "../../../db/models/member";

export async function getAllFamilyMembers(familyId: string): Promise<IFindData<FamilyMembers[]>>
{
    let status = 200;
    try
    {
        const resp = await FamilyMembers.findAll({
            include: [{
                model: Family,
                as: "family"
            }],
            where: { family_id: familyId }
        });
        logger.debug("Family members", resp);

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
        if(status == 200) status = 500;
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

export async function getFamilyMember(familyMemberId: string): Promise<IFindData<FamilyMembers>>
{
    let status = 200;
    try
    {
        const resp = await FamilyMembers.findOne({
            include: [{
                model: Family,
                as: "family"
            }],
            where: { id: familyMemberId }
        });
        logger.debug("Family members", resp);

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
        if(status == 200) status = 500;
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

export async function addMemberToFamily(familyId: string, member: memberAttributes): Promise<IFindData<familyMembersAttributes>>
{
    let status = 200;
    try
    {
        const info = {
            family_id: familyId,
            member_id: member.id, 
            union_date: (new Date()).toISOString()
        }
        const resp = await FamilyMembers.create(info as familyMembersAttributes);
        logger.debug("Family members", resp);

        if(!resp)
        {
            status = 400;
            const msg = "Could not create family";
            logger.error(msg, info);
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

export async function updateFamilyMember(id: string, family: familyMembersAttributes): Promise<IFindData<familyMembersAttributes>>
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
        
        const resp = await FamilyMembers.update(family, { where: { id: id }});
        logger.debug("Family member", resp);

        if(!(Array.isArray(resp) && resp.length > 0 && resp[0] == 1))
        {
            status = 400;
            const msg = "Could not update family member. Verify the object values and if it is not equals to the old object";
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

export async function deleteFamilyMember(id: string): Promise<IFindData<boolean>>
{
    let status = 200;
    try
    {        
        const resp = await FamilyMembers.destroy({ where: { id: id }});
        logger.debug("Family member", resp);

        if(!(resp && resp === 1))
        {
            status = 400;
            const msg = "Could not delete family member. Verify the object values and if it is not equals to the old object";
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

