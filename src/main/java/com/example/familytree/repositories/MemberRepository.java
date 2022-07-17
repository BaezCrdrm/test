package com.example.familytree.repositories;

import com.example.familytree.model.Member;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends CrudRepository<Member, String> {
    public ArrayList<Member> findByDescription(String description);
    public ArrayList<Member> findByDescriptionLike(String description);
}
