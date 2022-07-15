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

import com.example.familytree.model.Member;
import com.example.familytree.model.Response;
import com.example.familytree.services.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    MemberService service;
    
    @GetMapping()
    public ResponseEntity<Response<ArrayList<Member>>> getMembers() {
        var response = new Response<ArrayList<Member>>();
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
        return new ResponseEntity<Response<ArrayList<Member>>>(response, httpStatus);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<Optional<Member>>> getMemberById(@PathVariable("id") String id) {
        var response = new Response<Optional<Member>>();
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
        return new ResponseEntity<Response<Optional<Member>>>(response, httpStatus);
    }
    
    @PostMapping()
    public ResponseEntity<Response<Member>> postMember(@RequestBody Member member) {
        var response = new Response<Member>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            var data = this.service.save(member);
            response.setSuccess(false);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Member>>(response, httpStatus);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Response<Member>> updateMember(@PathVariable("id") String id, @RequestBody Member member) {
        var response = new Response<Member>();
        HttpStatus httpStatus = HttpStatus.OK;
        try
        {
            member.setId(id);
            var data = this.service.save(member);
            response.setSuccess(true);
            response.setData(data);
        }
        catch(Exception ex)
        {
            response.setSuccess(false);
            response.setError(ex.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<Response<Member>>(response, httpStatus);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> deleteMember(@PathVariable("id") String id) {
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
