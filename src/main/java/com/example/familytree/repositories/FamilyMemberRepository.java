package com.example.familytree.repositories;

import com.example.familytree.model.FamilyMember;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FamilyMemberRepository extends CrudRepository<FamilyMember, String> {
    public ArrayList<FamilyMember> findByFamilyId(String familyId);
    @Query("SELECT fm FROM FamilyMember fm INNER JOIN Member m ON fm.member.id = m.id WHERE fm.family.id = ?1 AND m.description LIKE ?2 GROUP BY fm.id")
    public ArrayList<FamilyMember> filterFamilyMembers(String familyId, String descriptionSearch);
}

