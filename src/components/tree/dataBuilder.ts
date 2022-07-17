import { IRelation } from "../../lib/data/definitions";
import { ITreeNode } from "./definitions";
import { format } from "date-fns";

interface ICheckOnChildNodes
{
    level?: number,
    data: IRelation[]
}

interface IAddress
{
    level: number,
    sequence: number,
}

interface IAddressData extends IAddress
{
    parent?: IAddress,
    data: IRelation
}

function dataBuilder(relations: IRelation[]): Promise<ITreeNode>
{
    return new Promise((resolve) => {
        const ids: any[] = []
        const mainNodeIndex = relations.findIndex(r => (r.familyMember1.relation === null || r.familyMember1.relation === undefined) &&
        (r.familyMember2.relation === null || r.familyMember2.relation === undefined));
        if(mainNodeIndex == -1) throw new Error("Could not get main node");
        ids.push(relations[mainNodeIndex].id);
        const data: ITreeNode = relationToNode(relations[mainNodeIndex], 0, 0);
        const directory = getDirectory(relations, mainNodeIndex);
        goDownData(data, directory);
    
        resolve(data);
    })
}

function getDirectory(relations: IRelation[], initIndex: number)
{
    /*
    1. Encontrar la primera relación
    2. Agregar la primera relacióna al directorio
    3. Econtrar las relaciones hijas de cada de las relaciones agregadas al directorio en el último nivel
    4. Guardar las relaciones temporalmente
    5. Vaciar las relaciones temporales en el directorio
    6. Guardar el ID de las relaciones agregadas al directorio
    7. Repetir 3
    */
    let directory: IAddressData[] = [];
    let level = 0;
    let maxLevel = 0;
    // 2. Agregar la primera relacióna al directorio
    directory.push({
        level: level,
        sequence: 0,
        data: relations[initIndex]
    });

    // 3. Econtrar las relaciones hijas de cada de las relaciones agregadas al directorio en el último nivel
    let total = directory.length;
    // Permite conocer el punto de "i" donde level deba aumentar en 1.
    let nextLevels = [total];
    for(let i = 0; i < total; i++)
    {
        if(i == nextLevels[0]) 
        {
            level++;
            nextLevels = nextLevels.splice(1);
        }
        const ir = directory[i];

        const tempSave: any[] = [];

        const childRelations = relations.filter(r => r.familyMember1.relation?.id === ir.data.id || r.familyMember2.relation?.id === ir.data.id);

        let sequence = 0;
        childRelations.forEach(rel => {
            maxLevel = level + 1;
            tempSave.push({
                level: maxLevel,
                sequence: sequence,
                parent: {
                    level: directory[i].level,
                    sequence: directory[i].sequence
                },
                data: rel
            })
            sequence++;
        });

        // directory.concat(tempSave);
        directory = [...directory, ...tempSave];
        const nextLength = directory.filter(addr => addr.level == level).length;
        if(nextLevels[nextLevels.length - 1] < nextLength)
            nextLevels.push(nextLength);
        total = directory.length;
    };

    // return {
    //     directory,
    //     maxLevel
    // }
    return directory;
}

function goDownData(data: ITreeNode, directory: IAddressData[])
{
    const level = data.attributes?.level;
    const sequence = data.attributes?.sequence;

    const filtered = directory.filter(a => a.parent?.level == level && a.parent?.sequence == sequence);
    if(Array.isArray(filtered) && filtered.length > 0)
    {
        data.children = filtered.map(f => relationToNode(f.data, f.level, f.sequence));
        data.children.forEach(child => {
            goDownData(child, directory);
        });
    }
    return data;
}

function getDate(date: string | Date)
{
    if(typeof date === "string")
    {
        date = new Date(date);
    }
    return format(date, "dd/MM/yyyy");
}

function relationToNode(relation: IRelation, level: number, sequence: number): ITreeNode
{
    return {
        name: `${relation.familyMember1.member?.description} - ${relation.familyMember2.member?.description}`,
        attributes: {
            id: relation.id || "",
            level: level,
            sequence: sequence,
            memberOne: relation.familyMember1.member?.description || "",
            dateMemberOne: getDate(relation.familyMember1.unionDate),
            memberTwo: relation.familyMember2.member?.description || "",
            dateMemberTwo: getDate(relation.familyMember2.unionDate)
        },
        children: []
    }
}

export default dataBuilder;
