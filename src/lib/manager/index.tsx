import { IFamilyMember, IMember, IRelation, IFamily } from "../data/definitions"

interface IStore {
    relations: IRelation[],
    members: IMember[] | IFamilyMember[],
    selectedFamily?: IFamily
}

const Store: IStore = {
    relations: [],
    members: [],
    selectedFamily: {
        id: "d5ca8bc3-49de-423d-a4e3-b8f1cc2ef600", 
        name: "Baez", 
        notes: "Familia Baez"
    }
}

export function setRelations(relations?: IRelation[])
{
    Store.relations = relations || [];
}

export function setMembers(members?: IMember[] | IFamilyMember[])
{
    Store.members = members || [];
}

export function setSelectedFamily(family: IFamily)
{
    Store.selectedFamily = family;
}

export default Store;
