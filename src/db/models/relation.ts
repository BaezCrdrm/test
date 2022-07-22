import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { family_members, family_membersId } from './family_members';

export interface relationAttributes {
  id: string;
  first_member_id: string;
  second_member_id: string;
}

export type relationPk = "id";
export type relationId = relation[relationPk];
export type relationCreationAttributes = relationAttributes;

export class relation extends Model<relationAttributes, relationCreationAttributes> implements relationAttributes {
  id!: string;
  first_member_id!: string;
  second_member_id!: string;

  // relation belongsTo family_members via first_member_id
  first_member!: family_members;
  getFirst_member!: Sequelize.BelongsToGetAssociationMixin<family_members>;
  setFirst_member!: Sequelize.BelongsToSetAssociationMixin<family_members, family_membersId>;
  createFirst_member!: Sequelize.BelongsToCreateAssociationMixin<family_members>;
  // relation belongsTo family_members via second_member_id
  second_member!: family_members;
  getSecond_member!: Sequelize.BelongsToGetAssociationMixin<family_members>;
  setSecond_member!: Sequelize.BelongsToSetAssociationMixin<family_members, family_membersId>;
  createSecond_member!: Sequelize.BelongsToCreateAssociationMixin<family_members>;
  // relation hasMany family_members via rel_parent_id
  family_members!: family_members[];
  getFamily_members!: Sequelize.HasManyGetAssociationsMixin<family_members>;
  setFamily_members!: Sequelize.HasManySetAssociationsMixin<family_members, family_membersId>;
  addFamily_member!: Sequelize.HasManyAddAssociationMixin<family_members, family_membersId>;
  addFamily_members!: Sequelize.HasManyAddAssociationsMixin<family_members, family_membersId>;
  createFamily_member!: Sequelize.HasManyCreateAssociationMixin<family_members>;
  removeFamily_member!: Sequelize.HasManyRemoveAssociationMixin<family_members, family_membersId>;
  removeFamily_members!: Sequelize.HasManyRemoveAssociationsMixin<family_members, family_membersId>;
  hasFamily_member!: Sequelize.HasManyHasAssociationMixin<family_members, family_membersId>;
  hasFamily_members!: Sequelize.HasManyHasAssociationsMixin<family_members, family_membersId>;
  countFamily_members!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof relation {
    return relation.init({
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    first_member_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'family_members',
        key: 'id'
      }
    },
    second_member_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'family_members',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'relation',
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
        name: "fk_relation_member_second_idx",
        using: "BTREE",
        fields: [
          { name: "second_member_id" },
        ]
      },
      {
        name: "fk_relation_member_fisrt_idx",
        using: "BTREE",
        fields: [
          { name: "first_member_id" },
        ]
      },
    ]
  });
  }
}
