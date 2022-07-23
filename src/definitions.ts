export interface IFindData<T>
{
    status: number,
    response: IResponse<T>
}

export interface IResponse<T>
{
    success: boolean,
    error?: string,
    data?: T
}

interface ISpringFamilyMember
{
    id: string,
    [key: string]: unknown
}

export interface ISpringRelation
{
    id: string,
    familyMember1: ISpringFamilyMember
    familyMember2: ISpringFamilyMember
}
