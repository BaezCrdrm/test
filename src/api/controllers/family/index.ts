import { Router } from "express";
import { familyAttributes } from "../../../db/models/family";
import { IFindData, IResponse } from "../../../definitions";
import { getErrorMessage } from "../../../utils/errorMessage";
import { createFamily, getAllFamilies, getFamily, updateFamily } from "./controller";
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

export default router;
