import { Router } from "express";
import { relationAttributes } from "../../../db/models/relation";
import { IFindData, IResponse } from "../../../definitions";
import { getErrorMessage } from "../../../utils/errorMessage";
import { springRelationToRelation } from "../../../utils/springConvert";
import { createRelation, getAllRelations, getRelation, updateRelation } from "./controller";
const router = Router();

router.get("/", async(req, res) => {
    try
    {
        const data: IFindData<unknown> = await getAllRelations();
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
        const data: IFindData<unknown> = await getRelation(id);
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
        let family = req.body;
        if(family.familyMember1)
            family = springRelationToRelation(family) as relationAttributes;
        const data: IFindData<unknown> = await createRelation(family as relationAttributes);
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
        const member = req.body as relationAttributes;
        const data: IFindData<unknown> = await updateRelation(id, member);
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
