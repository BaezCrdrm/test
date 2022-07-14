package com.example.familytree.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the family_members database table.
 * 
 */
@Entity
@Table(name="family_members")
@NamedQuery(name="FamilyMember.findAll", query="SELECT f FROM FamilyMember f")
public class FamilyMember implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Temporal(TemporalType.DATE)
	private Date unionDate;

	//bi-directional many-to-one association to Family
	@ManyToOne
	@JoinColumn(name="familyId")
	private Family family;

	//bi-directional many-to-one association to Member
	@ManyToOne
	@JoinColumn(name="memberId")
	private Member member;

	//bi-directional many-to-one association to Relation
	@ManyToOne
	@JoinColumn(name="relParentId")
	private Relation relation;

	//bi-directional many-to-one association to Relation
	@OneToMany(mappedBy="familyMember1")
	private List<Relation> relations1;

	//bi-directional many-to-one association to Relation
	@OneToMany(mappedBy="familyMember2")
	private List<Relation> relations2;

	public FamilyMember() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getUnionDate() {
		return this.unionDate;
	}

	public void setUnionDate(Date unionDate) {
		this.unionDate = unionDate;
	}

	public Family getFamily() {
		return this.family;
	}

	public void setFamily(Family family) {
		this.family = family;
	}

	public Member getMember() {
		return this.member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Relation getRelation() {
		return this.relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
	}

	public List<Relation> getRelations1() {
		return this.relations1;
	}

	public void setRelations1(List<Relation> relations1) {
		this.relations1 = relations1;
	}

	public Relation addRelations1(Relation relations1) {
		getRelations1().add(relations1);
		relations1.setFamilyMember1(this);

		return relations1;
	}

	public Relation removeRelations1(Relation relations1) {
		getRelations1().remove(relations1);
		relations1.setFamilyMember1(null);

		return relations1;
	}

	public List<Relation> getRelations2() {
		return this.relations2;
	}

	public void setRelations2(List<Relation> relations2) {
		this.relations2 = relations2;
	}

	public Relation addRelations2(Relation relations2) {
		getRelations2().add(relations2);
		relations2.setFamilyMember2(this);

		return relations2;
	}

	public Relation removeRelations2(Relation relations2) {
		getRelations2().remove(relations2);
		relations2.setFamilyMember2(null);

		return relations2;
	}

}