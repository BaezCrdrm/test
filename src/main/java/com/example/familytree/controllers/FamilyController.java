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

import com.example.familytree.model.Family;
import com.example.familytree.model.Response;
import com.example.familytree.services.FamilyService;

@RestController
@RequestMapping("/family")
public class FamilyController {
    @Autowired
    FamilyService service;
    
    @GetMapping()
    public Response<ArrayList<Family>> getFamilies() {
        var data = this.service.get();
        var response = new Response<ArrayList<Family>>(true);
        response.setData(data);
        return response;
    }
    
    @GetMapping(path = "/{id}")
    public Response<Optional<Family>> getFamilyById(@PathVariable("id") String id) {
        var data = this.service.getById(id);
        var response = new Response<Optional<Family>>(data);
        return response;
    }
    
    @PostMapping()
    public Response<Family> postFamily(@RequestBody Family member) {
        var data = this.service.save(member);
        var response = new Response<Family>(data, true);
        return response;
    }

    @DeleteMapping(path = "/{id}")
    public Response<String> deleteFamily(@PathVariable("id") String id) {
        var data = this.service.delete(id);
        var response = new Response<String>(id, data);
        return response;
    }
}
