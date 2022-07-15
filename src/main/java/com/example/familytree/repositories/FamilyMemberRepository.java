package com.example.familytree.repositories;

import com.example.familytree.model.FamilyMember;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FamilyMemberRepository extends CrudRepository<FamilyMember, String> {
}

