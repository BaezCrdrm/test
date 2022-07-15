package com.example.familytree.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.familytree.model.Member;
import com.example.familytree.repositories.MemberRepository;

@Service
public class MemberService {
    @Autowired
    MemberRepository memberRepository;

    public ArrayList<Member> get() {
        return (ArrayList<Member>)memberRepository.findAll();
    }
    
    public Member save(Member entity) {
        return (Member)memberRepository.save(entity);
    }

    public Optional<Member> getById(String id) {
        return memberRepository.findById(id);
    }

    public boolean delete(String id) {
        try {
            memberRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
