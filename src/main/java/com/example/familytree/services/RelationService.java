package com.example.familytree.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.familytree.model.Relation;
import com.example.familytree.repositories.RelationRepository;

@Service
public class RelationService {
    @Autowired
    RelationRepository RelationRepository;

    public ArrayList<Relation> get() {
        return (ArrayList<Relation>)RelationRepository.findAll();
    }
    
    public Relation save(Relation entity) {
        return (Relation)RelationRepository.save(entity);
    }

    public Optional<Relation> getById(String id) {
        return RelationRepository.findById(id);
    }

    public boolean delete(String id) {
        try {
            RelationRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
