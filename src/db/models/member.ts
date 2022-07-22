import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { family_members, family_membersId } from './family_members';

export interface memberAttributes {
  id: string;
  description: string;
  birthday: string;
  avatar: string;
}

export type memberPk = "id";
export type memberId = member[memberPk];
export type memberCreationAttributes = memberAttributes;

export class member extends Model<memberAttributes, memberCreationAttributes> implements memberAttributes {
  id!: string;
  description!: string;
  birthday!: string;
  avatar!: string;

  // member hasMany family_members via member_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof member {
    return member.init({
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'member',
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
    ]
  });
  }
}
