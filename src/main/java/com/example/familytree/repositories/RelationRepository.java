package com.example.familytree.repositories;

import com.example.familytree.model.Relation;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RelationRepository extends CrudRepository<Relation, String> {
}
