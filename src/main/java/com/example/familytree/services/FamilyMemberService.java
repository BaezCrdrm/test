package com.example.familytree.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.familytree.model.FamilyMember;
import com.example.familytree.repositories.FamilyMemberRepository;

@Service
public class FamilyMemberService {
    @Autowired
    FamilyMemberRepository FamilyMemberRepository;

    public ArrayList<FamilyMember> get() {
        return (ArrayList<FamilyMember>)FamilyMemberRepository.findAll();
    }
    
    public FamilyMember save(FamilyMember entity) {
        return (FamilyMember)FamilyMemberRepository.save(entity);
    }

    public Optional<FamilyMember> getById(String id) {
        return FamilyMemberRepository.findById(id);
    }

    public boolean delete(String id) {
        try {
            FamilyMemberRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
