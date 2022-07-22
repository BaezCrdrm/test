import type { Sequelize } from "sequelize";
import { family as _family } from "./family";
import type { familyAttributes, familyCreationAttributes } from "./family";
import { family_members as _family_members } from "./family_members";
import type { family_membersAttributes, family_membersCreationAttributes } from "./family_members";
import { member as _member } from "./member";
import type { memberAttributes, memberCreationAttributes } from "./member";
import { relation as _relation } from "./relation";
import type { relationAttributes, relationCreationAttributes } from "./relation";

export {
  _family as family,
  _family_members as family_members,
  _member as member,
  _relation as relation,
};

export type {
  familyAttributes,
  familyCreationAttributes,
  family_membersAttributes,
  family_membersCreationAttributes,
  memberAttributes,
  memberCreationAttributes,
  relationAttributes,
  relationCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const family = _family.initModel(sequelize);
  const family_members = _family_members.initModel(sequelize);
  const member = _member.initModel(sequelize);
  const relation = _relation.initModel(sequelize);

  family_members.belongsTo(family, { as: "family", foreignKey: "family_id"});
  family.hasMany(family_members, { as: "family_members", foreignKey: "family_id"});
  relation.belongsTo(family_members, { as: "first_member", foreignKey: "first_member_id"});
  family_members.hasMany(relation, { as: "relations", foreignKey: "first_member_id"});
  relation.belongsTo(family_members, { as: "second_member", foreignKey: "second_member_id"});
  family_members.hasMany(relation, { as: "second_member_relations", foreignKey: "second_member_id"});
  family_members.belongsTo(member, { as: "member", foreignKey: "member_id"});
  member.hasMany(family_members, { as: "family_members", foreignKey: "member_id"});
  family_members.belongsTo(relation, { as: "rel_parent", foreignKey: "rel_parent_id"});
  relation.hasMany(family_members, { as: "family_members", foreignKey: "rel_parent_id"});

  return {
    family: family,
    family_members: family_members,
    member: member,
    relation: relation,
  };
}
