import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { family_members, family_membersId } from './family_members';

export interface familyAttributes {
  id: string;
  name: string;
  notes?: string;
}

export type familyPk = "id";
export type familyId = family[familyPk];
export type familyOptionalAttributes = "notes";
export type familyCreationAttributes = Optional<familyAttributes, familyOptionalAttributes>;

export class family extends Model<familyAttributes, familyCreationAttributes> implements familyAttributes {
  id!: string;
  name!: string;
  notes?: string;

  // family hasMany family_members via family_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof family {
    return family.init({
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'family',
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
