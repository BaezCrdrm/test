import { IFamily, IFamilyMember, IMember, IRelation, IResponse } from "./definitions";
import { get, post } from "./restApi";

async function customSearch<T>(endpoint: string, functionName: string)
{
    try
    {
        const resp = await get(endpoint);
        if(resp.status !== 200)
            console.warn("Response is not ok", resp);
         
        const data = resp.data as IResponse<T>;
        if(data.data) return data.data;
        console.error("Get response data", data);
        throw new Error("Could not retrieve data");
    }
    catch(error)
    {
        console.error(functionName, error);
    }
    return undefined;
}

async function customPost<T>(endpoint: string, newData: T, functionName: string)
{
    try
    {
        const resp = await post(endpoint, newData);
        if(resp.status !== 200)
            console.warn("Response is not ok", resp);
         
        const data = resp.data as IResponse<T>;
        if(data.data) return data.data;
        console.error("Get response data", data);
        throw new Error("Could not retrieve data");
    }
    catch(error)
    {
        console.error(functionName, error);
    }
    return undefined;
}

export async function getAllRelations()
{
    let rels = await customSearch<IRelation[]>("relation", "getAllRelations");
    const promises = rels?.map(getFamilyMembersFromRelation) || [];
    rels = (await Promise.all(promises)) as IRelation[];
    return rels;
}

function getFamilyMembersFromRelation(rel: IRelation)
{
    return new Promise(async(resolve, reject) => {
        if(rel.familyMember1 || rel.familyMember2) 
        {
            resolve(rel);
            return;
        }

        if(!(rel.first_member_id && rel.second_member_id))
        {
            const msg = "Could not get first_member_id or second_member_id";
            console.error(msg, rel);
            reject(rel);
            return;
        }

        // const members = await Promise.all([
        //     await getFamilyMemberById(rel.first_member_id),
        //     await getFamilyMemberById(rel.second_member_id),
        // ]);

        // if(!members)
        // {
        //     reject("Could not get members");
        //     return;
        // }

        // rel.familyMember1 = members[0];
        // rel.familyMember2 = members[1];
        
        rel.familyMember1 = {id: rel.first_member_id} as any;
        rel.familyMember2 = {id: rel.second_member_id} as any;

        resolve(rel);
    });
}

export async function getFamilyMemberById(id: string)
{
    const endpoint = `family/member/${id}`;
    return customSearch<IFamilyMember>(endpoint, "getMemberById");
}

export async function searchMember(description: string)
{
    const endpoint = `member?description=${description}`;
    return customSearch<IMember[]>(endpoint, "searchMember");
}

export async function searchFamily(name: string)
{
    const endpoint = `family?name=${name}`;
    return customSearch<IFamily[]>(endpoint, "searchFamily");
}

export async function getFamilyMembers(familyId: string, name?: string)
{
    let endpoint = `family/${familyId}/members`;
    if(name)
        endpoint += `?name=${name}`;
    return customSearch<IFamilyMember[]>(endpoint, "getFamilyMembers");
}

// export async function relateMembers(family: IFamily, )

export async function postFamily(data: IFamily)
{
    return customPost("family", data, "saveFamily");
}

export async function postMember(data: IMember)
{
    return customPost("member", data, "postMember");
}

export async function postMemberToFamily(familyId: string, data: IMember)
{
    return customPost(`family/${familyId}/addmember`, data, "postMemberToFamily");
}

export async function postRelation(data: IRelation)
{
    return customPost(`relation`, data, "postRelation");
}
