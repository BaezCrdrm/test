package com.example.familytree.model;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

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
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name="id")
	private String id;

	@Temporal(TemporalType.DATE)
	@Column(name="union_date")
	private Date unionDate;

	//bi-directional many-to-one association to Family
	@ManyToOne
	private Family family;

	//bi-directional many-to-one association to Member
	@ManyToOne
	private Member member;

	//bi-directional many-to-one association to Relation
	@ManyToOne
	@JoinColumn(name="rel_parent_id")
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