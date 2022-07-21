import { Router } from "express";
import logger from "../logger";
import MemberRouter from "./controllers/member";
const router = Router();

router.get("/", (req, res) => {
    logger.info("api");
})
router.use("/member", MemberRouter);
router.use("/family", MemberRouter);
router.use("/relation", MemberRouter);

export default router;
