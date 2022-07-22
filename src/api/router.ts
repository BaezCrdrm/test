import { Router } from "express";
import logger from "../logger";
import MemberRouter from "./controllers/member";
import FamilyRouter from "./controllers/family";
import RelationRouter from "./controllers/relation";
const router = Router();

router.get("/", (req, res) => {
    logger.info("api");
})
router.use("/member", MemberRouter);
router.use("/family", FamilyRouter);
router.use("/relation", RelationRouter);

export default router;
