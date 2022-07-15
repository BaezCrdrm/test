package com.example.familytree.repositories;

import com.example.familytree.model.Family;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FamilyRepository extends CrudRepository<Family, String> {
}

