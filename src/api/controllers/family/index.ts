import { Router } from "express";
import { familyAttributes } from "../../../db/models/family";
import { family_members as familyMembersAttributes } from "../../../db/models/family_members";
import { memberAttributes } from "../../../db/models/member";
import { IFindData, IResponse } from "../../../definitions";
import { getErrorMessage } from "../../../utils/errorMessage";
import { createFamily, getAllFamilies, getFamily, updateFamily } from "./familyController";
import { addMemberToFamily, deleteFamilyMember, getAllFamilyMembers, getFamilyMember, updateFamilyMember } from "./familyMembersController";
const router = Router();

router.get("/", async(req, res) => {
    try
    {
        const data: IFindData<unknown> = await getAllFamilies();
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.get("/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const data: IFindData<unknown> = await getFamily(id);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.post("/", async(req, res) => {
    try
    {
        const family = req.body as familyAttributes;
        const data: IFindData<unknown> = await createFamily(family);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.put("/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const member = req.body as familyAttributes;
        const data: IFindData<unknown> = await updateFamily(id, member);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.get("/:id/members", async(req, res) => {
    try
    {
        const id = req.params.id
        const data: IFindData<unknown> = await getAllFamilyMembers(id);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.get("/member/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const data: IFindData<unknown> = await getFamilyMember(id);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.post("/:id/addmember", async(req, res) => {
    try
    {
        const id = req.params.id
        const member = req.body as memberAttributes;
        const data: IFindData<unknown> = await addMemberToFamily(id, member);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.put("/member/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const member = req.body as familyMembersAttributes;
        const data: IFindData<unknown> = await updateFamilyMember(id, member);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

router.delete("/member/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const data: IFindData<unknown> = await deleteFamilyMember(id);
        res.status(data.status).send(data.response);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse<unknown> = {
            success: false,
            error: msg
        }
        res.status(500).send(resp);
    }
});

export default router;
