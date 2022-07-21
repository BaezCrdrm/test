import { Router } from "express";
import { IResponse } from "../../../definitions";
import logger from "../../../logger";
import { getErrorMessage } from "../../../utils/errorMessage";
import { getAllMembers } from "./controller";
const router = Router();

router.get("/", (req, res) => {
    logger.info("membeeer");
    try
    {
        const data: any = getAllMembers();
        res.status(data.status || 200).send(data);
    }
    catch(error)
    {
        const msg = getErrorMessage(error);
        const resp: IResponse = {
            status: 500,
            error: msg
        }
        res.status(500).send(resp);
    }
});

export default router;
