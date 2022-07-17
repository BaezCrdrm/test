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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.familytree.model.Family;
import com.example.familytree.model.FamilyMember;
import com.example.familytree.model.Member;
import com.example.familytree.model.Response;
import com.example.familytree.services.FamilyMemberService;
import com.example.familytree.services.FamilyService;

@RestController
@RequestMapping("/family")
public class FamilyController {
    @Autowired
    FamilyService familyService;
    @Autowired
    FamilyMemberService familyMemberService;
    
    @GetMapping()
    public ResponseEntity<Response<ArrayList<Family>>> getFamilies(@RequestParam(value = "name", defaultValue = "") String name) {
        var response = new Response<ArrayList<Family>>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            if(name.isEmpty())
            {
                var data = this.familyService.get();
                response.setSuccess(true);
                response.setData(data);
            }
            else
            {
                var data = this.familyService.findByName(name.trim());
                response.setSuccess(true);
                response.setData(data);
            }
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
            var data = this.familyService.getById(id);
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
            var data = this.familyService.save(family);
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
            var data = this.familyService.save(family);
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
            var data = this.familyService.delete(id);
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

    @GetMapping(path = "/{id}/members")
    public ResponseEntity<Response<ArrayList<FamilyMember>>> getMembers(@PathVariable("id") String id, 
        @RequestParam(value = "name", defaultValue = "") String name) 
    {
        var response = new Response<ArrayList<FamilyMember>>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            if(name.isEmpty())
            {
                var data = this.familyMemberService.getMembers(id);
                response.setSuccess(true);
                response.setData(data);
            }
            else
            {
                var data = this.familyMemberService.getByMemberName(id, name);
                response.setSuccess(true);
                response.setData(data);
            }
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<ArrayList<FamilyMember>>>(response, httpStatus);
    }
    
    @GetMapping(path = "/member/{membershipId}")
    public ResponseEntity<Response<FamilyMember>> getFamilyMember(@PathVariable("membershipId") String membershipId) {
        var response = new Response<FamilyMember>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.familyMemberService.getById(membershipId).get();
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<FamilyMember>>(response, httpStatus);
    }

    @PostMapping(path = "/{id}/addmember")
    public ResponseEntity<Response<FamilyMember>> addMember(@PathVariable("id") String id, @RequestBody Member member) {
        var response = new Response<FamilyMember>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.familyMemberService.addMember(id, member);
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<FamilyMember>>(response, httpStatus);
    }
    
    @PutMapping(path = "/member/{id}")
    public ResponseEntity<Response<FamilyMember>> updateFamilyMember(@PathVariable("id") String id, @RequestBody FamilyMember member) {
        var response = new Response<FamilyMember>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            if(member.getId() != null && !member.getId().equals(id))
            {
                throw new Exception("The member ID can not be different from the request ID");
            }
            member.setId(id);
            var data = this.familyMemberService.save(member);
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<FamilyMember>>(response, httpStatus);
    }
}
