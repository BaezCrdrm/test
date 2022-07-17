package com.example.familytree.repositories;

import com.example.familytree.model.Family;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FamilyRepository extends CrudRepository<Family, String> {
    public ArrayList<Family> findByNameLike(String description);
}

