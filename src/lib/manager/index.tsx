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

export function getRelations()
{
    return Store.relations;
}

export function getMembers()
{
    return Store.members;
}

export function setSelectedFamily(family: IFamily)
{
    Store.selectedFamily = family;
}

export function addRelation(relation: IRelation)
{
    const index = Store.relations.findIndex(r => r.id == relation.id);
    if(index === -1)
        Store.relations.push(relation);
    else
        Store.relations[index] = relation;
}

export function addMember(member: IMember | IFamilyMember)
{
    const index = Store.members.findIndex(m => m.id == member.id);
    if(index === -1)
        Store.members.push(member as any);
    else
        Store.members[index] = member;
}

export default Store;
