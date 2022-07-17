import { IFamily, IMember, IRelation, IResponse } from "./definitions";
import { get, post } from "./restApi";

async function customSearch<T>(endpoint: string, functionName: string)
{
    try
    {
        const resp = await get(endpoint);
        if(resp.status !== 200)
            console.warn("Response is not ok", resp);
         
        const data = resp.data as IResponse<T[]>;
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
    return customSearch<IRelation>("relation", "getAllRelations");
}

export async function searchMember(description: string)
{
    const endpoint = `member?description=${description}`;
    return customSearch<IMember>(endpoint, "searchMember");
}

export async function searchFamily(name: string)
{
    const endpoint = `family?name=${name}`;
    return customSearch<IFamily>(endpoint, "searchFamily");
}

export async function searchFamilyMember(familyId: string, name: string)
{
    const endpoint = `family/${familyId}/members?name=${name}`;
    return customSearch<IFamily>(endpoint, "searchFamilyMember");
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
