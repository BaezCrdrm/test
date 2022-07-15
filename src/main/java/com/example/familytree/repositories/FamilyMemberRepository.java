package com.example.familytree.repositories;

import com.example.familytree.model.FamilyMember;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FamilyMemberRepository extends CrudRepository<FamilyMember, String> {
    public ArrayList<FamilyMember> findByFamilyId(String familyId);
}

