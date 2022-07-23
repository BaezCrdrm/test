// export interface ITreeNode 
// {
//     name: string,
//     children?: ITreeNode[],
//     attributes?: {
//         id: string,
//         level: number,
//         sequence: number,
//         memberOne: string,
//         dateMemberOne: string,
//         memberTwo: string,
//         dateMemberTwo: string,
//     }
// }

type IdValue = number | string;

export interface ITreeNode 
{
    id: IdValue, 
    name: string,
    pids?: IdValue[],
    mid?: IdValue, 
    fid?: IdValue
}
