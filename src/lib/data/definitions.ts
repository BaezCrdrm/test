export type DataType = "member" | "family" | "relation" | "memberfamily";

export interface IResponse<T>
{
    success: boolean,
    data: T,
    error?: string | null
}

/**
 * Utilizado cuando existen datos cuya forma no es necesaria
 * ser completada para poder funcionar con la petición
 */
export interface IBaseSimpleId
{
    id: string
}

export interface IMember
{
    id?: string,
    avatar: string,
    birthday: string | Date,
    description: string
}

export interface IFamily
{
    id?: string,
    name: string,
    notes?: string
}

export interface IFamilyMember
{
    id?: string,
    unionDate: string | Date,
    family?: IFamily,
    member?: IMember,
    relation?: IRelation,
    rel_parent_id?: string
}

export interface IRelation
{
    id?: string,
    familyMember1?: IFamilyMember,
    familyMember2?: IFamilyMember,
    "first_member_id"?: string,
    "second_member_id"?: string
}
