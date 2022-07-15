package com.example.familytree.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.familytree.model.Relation;
import com.example.familytree.model.Response;
import com.example.familytree.services.RelationService;

@RestController
@RequestMapping("/relation")
public class RelationController {
    @Autowired
    RelationService service;
    
    @GetMapping()
    public Response<ArrayList<Relation>> getRelations() {
        var data = this.service.get();
        Response<ArrayList<Relation>> response = new Response<ArrayList<Relation>>(true);
        response.setData(data);
        return response;
    }
    
    @GetMapping(path = "/{id}")
    public Response<Optional<Relation>> getRelationById(@PathVariable("id") String id) {
        var data = this.service.getById(id);
        Response<Optional<Relation>> response = new Response<Optional<Relation>>(data);
        return response;
    }
    
    @PostMapping()
    public Response<Relation> postRelation(@RequestBody Relation member) {
        var data = this.service.save(member);
        var response = new Response<Relation>(data, true);
        return response;
    }

    @DeleteMapping(path = "/{id}")
    public Response<String> deleteRelation(@PathVariable("id") String id) {
        var data = this.service.delete(id);
        var response = new Response<String>(id, data);
        return response;
    }
}
