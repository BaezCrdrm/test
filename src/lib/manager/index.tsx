import { IFamilyMember, IMember, IRelation } from "../data/definitions"

interface IStore {
    relations: IRelation[],
    members: IMember[] | IFamilyMember[],
}

const Store: IStore = {
    relations: [],
    members: []
}

export function setRelations(relations?: IRelation[])
{
    Store.relations = relations || [];
}

export function setMembers(members?: IMember[] | IFamilyMember[])
{
    Store.members = members || [];
}

export default Store;
