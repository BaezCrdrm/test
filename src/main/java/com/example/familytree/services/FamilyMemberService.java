package com.example.familytree.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.familytree.model.Family;
import com.example.familytree.model.FamilyMember;
import com.example.familytree.model.Member;
import com.example.familytree.repositories.FamilyMemberRepository;
import com.example.familytree.repositories.FamilyRepository;

@Service
public class FamilyMemberService {
    @Autowired
    FamilyMemberRepository familyMemberRepository;
    @Autowired
    FamilyRepository familyRepository;

    public ArrayList<FamilyMember> getMembers(String familyId) {
        return (ArrayList<FamilyMember>)familyMemberRepository.findByFamilyId(familyId);
    }

    public FamilyMember addMember(String familyId, Member member) throws Exception
    {
        Optional<Family> optionalFamily = (Optional<Family>)familyRepository.findById(familyId);
        if(optionalFamily == null) {
            throw new Exception("Could not find family with ID " + familyId);
        }
        Family family = optionalFamily.get();

        return this.addMember(family, member);
    }

    public FamilyMember addMember(Family family, Member member)
    {
        FamilyMember fm = new FamilyMember();
        fm.setFamily(family);
        fm.setMember(member);

        // Obtiene la fecha de hoy
        Date union = Calendar.getInstance().getTime();
        fm.setUnionDate(union);

        return this.save(fm);
    }
    
    public FamilyMember save(FamilyMember entity) {
        return (FamilyMember)familyMemberRepository.save(entity);
    }

    public Optional<FamilyMember> getById(String id) {
        return familyMemberRepository.findById(id);
    }

    public ArrayList<FamilyMember> getByMemberName(String familyId, String memberName)
    {
        return familyMemberRepository.filterFamilyMembers(familyId, "%" + memberName + "%");
    }

    public boolean delete(String id) {
        try {
            familyMemberRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
