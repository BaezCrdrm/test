package com.example.familytree.repositories;

import com.example.familytree.model.Member;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends CrudRepository<Member, String> {
}
