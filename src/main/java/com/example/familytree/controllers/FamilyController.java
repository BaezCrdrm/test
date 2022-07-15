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

import com.example.familytree.model.Family;
import com.example.familytree.model.Response;
import com.example.familytree.services.FamilyService;

@RestController
@RequestMapping("/family")
public class FamilyController {
    @Autowired
    FamilyService service;
    
    @GetMapping()
    public ResponseEntity<Response<ArrayList<Family>>> getFamilys() {
        var response = new Response<ArrayList<Family>>();
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
        return new ResponseEntity<Response<ArrayList<Family>>>(response, httpStatus);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<Optional<Family>>> getFamilyById(@PathVariable("id") String id) {
        var response = new Response<Optional<Family>>();
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
        return new ResponseEntity<Response<Optional<Family>>>(response, httpStatus);
    }
    
    @PostMapping()
    public ResponseEntity<Response<Family>> postFamily(@RequestBody Family family) {
        var response = new Response<Family>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.save(family);
            response.setSuccess(false);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Family>>(response, httpStatus);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Response<Family>> updateFamily(@PathVariable("id") String id, @RequestBody Family family) {
        var response = new Response<Family>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            family.setId(id);
            var data = this.service.save(family);
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Family>>(response, httpStatus);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> deleteFamily(@PathVariable("id") String id) {
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
