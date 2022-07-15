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

import com.example.familytree.model.Member;
import com.example.familytree.model.Response;
import com.example.familytree.services.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    MemberService service;
    
    // @GetMapping()
    // public Response<ArrayList<Member>> getMembers() {
    //     Response<ArrayList<Member>> response = new Response<ArrayList<Member>>();
    //     try
    //     {
    //         var data = this.service.get();
    //         response.setSuccess(false);
    //         response.setData(data);
    //     }
    //     catch(Exception ex)
    //     {
    //         response.setSuccess(false);
    //         response.setError(ex.getMessage());
    //     }
    //     return response;
    // }
    
    @GetMapping()
    public ArrayList<Member> getMembers() {
        // ArrayList<Member> response = new ArrayList<Member>();
        var data = this.service.get();
        // try
        // {
        //     response.setSuccess(false);
        //     response.setData(data);
        // }
        // catch(Exception ex)
        // {
        //     response.setSuccess(false);
        //     response.setError(ex.getMessage());
        // }
        // return response;
        return data;
    }
    
    @GetMapping(path = "/{id}")
    public Response<Optional<Member>> getMemberById(@PathVariable("id") String id) {
        var data = this.service.getById(id);
        Response<Optional<Member>> response = new Response<Optional<Member>>(data);
        return response;
    }
    
    @PostMapping()
    public Response<Member> postMember(@RequestBody Member member) {
        var data = this.service.save(member);
        var response = new Response<Member>(data, true);
        return response;
    }

    @DeleteMapping(path = "/{id}")
    public Response<String> deleteMember(@PathVariable("id") String id) {
        var data = this.service.delete(id);
        var response = new Response<String>(id, data);
        return response;
    }
}
