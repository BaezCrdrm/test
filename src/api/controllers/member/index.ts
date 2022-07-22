import { Router } from "express";
import { memberAttributes } from "../../../db/models/member";
import { IFindData, IResponse } from "../../../definitions";
import { getErrorMessage } from "../../../utils/errorMessage";
import { createMember, deleteMember, getAllMembers, getMember, updateMember } from "./controller";
const router = Router();

router.get("/", async(req, res) => {
    try
    {
        const data: IFindData<unknown> = await getAllMembers();
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
        const data: IFindData<unknown> = await getMember(id);
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
        const member = req.body as memberAttributes;
        const data: IFindData<unknown> = await createMember(member);
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
        const member = req.body as memberAttributes;
        const data: IFindData<unknown> = await updateMember(id, member);
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

router.delete("/:id", async(req, res) => {
    try
    {
        const id = req.params.id
        const data: IFindData<unknown> = await deleteMember(id);
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
