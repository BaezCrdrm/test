import { IRelation } from "../data/definitions"

interface IStore {
    relations: IRelation[]
}

const Store: IStore = {
    relations: []
}

export function setRelations(relations?: IRelation[])
{
    Store.relations = relations || [];
}

export default Store;
