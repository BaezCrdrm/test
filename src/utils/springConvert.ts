import { relationAttributes } from "../db/models/relation";
import { ISpringRelation } from "../definitions";

export function springRelationToRelation(data: ISpringRelation)
{
    return {
        first_member_id: data.familyMember1.id,
        second_member_id: data.familyMember2.id
    }
}
