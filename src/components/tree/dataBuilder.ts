import { IFamilyMember, IRelation } from "../../lib/data/definitions";
import { ITreeNode } from "./definitions";

function dataBuilder(members: IFamilyMember[], relations: IRelation[]): Promise<ITreeNode[]>
{
    return new Promise((resolve, reject) => {
        let data: ITreeNode[] = members.map(m => membersToNodes(m, relations));
        data = getHorizontalRelations(data, relations);
        resolve(data as ITreeNode[]);
    });
}

/**
 * Genera relaciones verticales
 * @param member 
 * @param relations 
 * @returns 
 */
function membersToNodes(member: IFamilyMember, relations: IRelation[])
{
    if(!(member?.id && member?.member?.description))
    {
        const msg = "Could not get member info";
        console.warn(msg, member);
        throw new Error(msg);
    }

    let node: ITreeNode = {
        id: member.id,
        name: member.member.description
    };

    if(!member.relation && member.rel_parent_id)
    {
        member.relation = {
            id: member.rel_parent_id
        }
    }

    if(member.relation)
    {
        const parentRel = relations.find(pr => member.relation?.id == pr.id);
        if(parentRel && parentRel.familyMember1 && parentRel.familyMember2)
        {
            node = {
                ... node,
                fid: parentRel.familyMember1.id,
                mid: parentRel.familyMember2.id
            }
        }
    }

    return node;
}

/**
 * Mapea relaciones horizontales
 * @param nodes 
 * @param relations 
 * @param members 
 * @returns 
 */
function getHorizontalRelations(nodes: ITreeNode[], relations: IRelation[]): ITreeNode[]
{
    relations.forEach(rel => {
        const indexOne = nodes.findIndex(n => n.id == rel.familyMember1?.id);
        if(indexOne == -1) return;
        if(Array.isArray(nodes[indexOne].pids))
        {
            const id = rel.familyMember2?.id as any;
            if(!nodes[indexOne].pids?.some(id))
                nodes[indexOne].pids?.push(id)
        }
        else
        {
            nodes[indexOne].pids = [rel.familyMember2?.id as any]
        }

        // Segunda columna
        const indexTwo = nodes.findIndex(n => n.id == rel.familyMember2?.id);
        if(indexTwo == -1) return;
        if(Array.isArray(nodes[indexTwo].pids))
        {
            const id = rel.familyMember1?.id as any;
            if(!nodes[indexTwo].pids?.some(id))
                nodes[indexTwo].pids?.push(id)
        }
        else
        {
            nodes[indexTwo].pids = [rel.familyMember1?.id as any]
        }
    });
    return nodes;
}

export default dataBuilder;
