package com.example.familytree.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.familytree.model.Family;
import com.example.familytree.repositories.FamilyRepository;

@Service
public class FamilyService {
    @Autowired
    FamilyRepository FamilyRepository;

    public ArrayList<Family> get() {
        return (ArrayList<Family>)FamilyRepository.findAll();
    }
    
    public Family save(Family entity) {
        return (Family)FamilyRepository.save(entity);
    }

    public Optional<Family> getById(String id) {
        return FamilyRepository.findById(id);
    }

    public boolean delete(String id) {
        try {
            FamilyRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
