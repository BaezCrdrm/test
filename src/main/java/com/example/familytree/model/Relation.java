package com.example.familytree.model;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.util.List;


/**
 * The persistent class for the relation database table.
 * 
 */
@Entity
@Table(name="relation")
@NamedQuery(name="Relation.findAll", query="SELECT r FROM Relation r")
public class Relation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	//bi-directional many-to-one association to FamilyMember
	@OneToMany(mappedBy="relation")
	private List<FamilyMember> familyMembers;

	//bi-directional many-to-one association to FamilyMember
	@ManyToOne
	@JoinColumn(name="firstMemberId")
	private FamilyMember familyMember1;

	//bi-directional many-to-one association to FamilyMember
	@ManyToOne
	@JoinColumn(name="secondMemberId")
	private FamilyMember familyMember2;

	public Relation() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<FamilyMember> getFamilyMembers() {
		return this.familyMembers;
	}

	public void setFamilyMembers(List<FamilyMember> familyMembers) {
		this.familyMembers = familyMembers;
	}

	public FamilyMember addFamilyMember(FamilyMember familyMember) {
		getFamilyMembers().add(familyMember);
		familyMember.setRelation(this);

		return familyMember;
	}

	public FamilyMember removeFamilyMember(FamilyMember familyMember) {
		getFamilyMembers().remove(familyMember);
		familyMember.setRelation(null);

		return familyMember;
	}

	public FamilyMember getFamilyMember1() {
		return this.familyMember1;
	}

	public void setFamilyMember1(FamilyMember familyMember1) {
		this.familyMember1 = familyMember1;
	}

	public FamilyMember getFamilyMember2() {
		return this.familyMember2;
	}

	public void setFamilyMember2(FamilyMember familyMember2) {
		this.familyMember2 = familyMember2;
	}

}