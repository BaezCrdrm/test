package com.example.familytree.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<Response<ArrayList<Relation>>> getRelations() {
        var response = new Response<ArrayList<Relation>>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.get();
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<ArrayList<Relation>>>(response, httpStatus);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<Optional<Relation>>> getRelationById(@PathVariable("id") String id) {
        var response = new Response<Optional<Relation>>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.getById(id);
            response.setSuccess(false);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Optional<Relation>>>(response, httpStatus);
    }
    
    @PostMapping()
    public ResponseEntity<Response<Relation>> postRelation(@RequestBody Relation relation) {
        var response = new Response<Relation>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.save(relation);
            response.setSuccess(false);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Relation>>(response, httpStatus);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Response<Relation>> updateRelation(@PathVariable("id") String id, @RequestBody Relation relation) {
        var response = new Response<Relation>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            relation.setId(id);
            var data = this.service.save(relation);
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Relation>>(response, httpStatus);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> deleteRelation(@PathVariable("id") String id) {
        var response = new Response<String>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.delete(id);
            if(data == false)
            {
                httpStatus = HttpStatus.NOT_FOUND;
            }
            response.setSuccess(data);
            response.setData(id);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<String>>(response, httpStatus);
    }
}
