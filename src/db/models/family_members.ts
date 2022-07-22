import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { family, familyId } from './family';
import type { member, memberId } from './member';
import type { relation, relationId } from './relation';

export interface family_membersAttributes {
  id: string;
  member_id: string;
  family_id: string;
  union_date: string;
  rel_parent_id?: string;
}

export type family_membersPk = "id";
export type family_membersId = family_members[family_membersPk];
export type family_membersOptionalAttributes = "rel_parent_id";
export type family_membersCreationAttributes = Optional<family_membersAttributes, family_membersOptionalAttributes>;

export class family_members extends Model<family_membersAttributes, family_membersCreationAttributes> implements family_membersAttributes {
  id!: string;
  member_id!: string;
  family_id!: string;
  union_date!: string;
  rel_parent_id?: string;

  // family_members belongsTo family via family_id
  family!: family;
  getFamily!: Sequelize.BelongsToGetAssociationMixin<family>;
  setFamily!: Sequelize.BelongsToSetAssociationMixin<family, familyId>;
  createFamily!: Sequelize.BelongsToCreateAssociationMixin<family>;
  // family_members hasMany relation via first_member_id
  relations!: relation[];
  getRelations!: Sequelize.HasManyGetAssociationsMixin<relation>;
  setRelations!: Sequelize.HasManySetAssociationsMixin<relation, relationId>;
  addRelation!: Sequelize.HasManyAddAssociationMixin<relation, relationId>;
  addRelations!: Sequelize.HasManyAddAssociationsMixin<relation, relationId>;
  createRelation!: Sequelize.HasManyCreateAssociationMixin<relation>;
  removeRelation!: Sequelize.HasManyRemoveAssociationMixin<relation, relationId>;
  removeRelations!: Sequelize.HasManyRemoveAssociationsMixin<relation, relationId>;
  hasRelation!: Sequelize.HasManyHasAssociationMixin<relation, relationId>;
  hasRelations!: Sequelize.HasManyHasAssociationsMixin<relation, relationId>;
  countRelations!: Sequelize.HasManyCountAssociationsMixin;
  // family_members hasMany relation via second_member_id
  second_member_relations!: relation[];
  getSecond_member_relations!: Sequelize.HasManyGetAssociationsMixin<relation>;
  setSecond_member_relations!: Sequelize.HasManySetAssociationsMixin<relation, relationId>;
  addSecond_member_relation!: Sequelize.HasManyAddAssociationMixin<relation, relationId>;
  addSecond_member_relations!: Sequelize.HasManyAddAssociationsMixin<relation, relationId>;
  createSecond_member_relation!: Sequelize.HasManyCreateAssociationMixin<relation>;
  removeSecond_member_relation!: Sequelize.HasManyRemoveAssociationMixin<relation, relationId>;
  removeSecond_member_relations!: Sequelize.HasManyRemoveAssociationsMixin<relation, relationId>;
  hasSecond_member_relation!: Sequelize.HasManyHasAssociationMixin<relation, relationId>;
  hasSecond_member_relations!: Sequelize.HasManyHasAssociationsMixin<relation, relationId>;
  countSecond_member_relations!: Sequelize.HasManyCountAssociationsMixin;
  // family_members belongsTo member via member_id
  member!: member;
  getMember!: Sequelize.BelongsToGetAssociationMixin<member>;
  setMember!: Sequelize.BelongsToSetAssociationMixin<member, memberId>;
  createMember!: Sequelize.BelongsToCreateAssociationMixin<member>;
  // family_members belongsTo relation via rel_parent_id
  rel_parent!: relation;
  getRel_parent!: Sequelize.BelongsToGetAssociationMixin<relation>;
  setRel_parent!: Sequelize.BelongsToSetAssociationMixin<relation, relationId>;
  createRel_parent!: Sequelize.BelongsToCreateAssociationMixin<relation>;

  static initModel(sequelize: Sequelize.Sequelize): typeof family_members {
    return family_members.init({
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'member',
        key: 'id'
      }
    },
    family_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'family',
        key: 'id'
      }
    },
    union_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rel_parent_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'relation',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'family_members',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_family_members_family_idx",
        using: "BTREE",
        fields: [
          { name: "family_id" },
        ]
      },
      {
        name: "fk_family_members_member_idx",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "fk_family_members_relation_idx",
        using: "BTREE",
        fields: [
          { name: "rel_parent_id" },
        ]
      },
    ]
  });
  }
}
