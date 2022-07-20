import { corsOptionsDelegate } from "./cors";
import { IResponse } from "./definitions";
import packageJson from "../package.json";
import express from "express";
import cors from "cors";
import ServerRouter from "./server/router";
import ApiRouter from "./api/router";
import logger from "./logger";

// eslint-disable-next-line
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", cors(corsOptionsDelegate), ServerRouter);
app.use("/api/", cors(corsOptionsDelegate), ApiRouter);

app.all("*", cors(corsOptionsDelegate), (req: any, res: any) => 
{
    const notFoundResp: IResponse = {
        status: 404,
        error: "This route does not exist",
        error_code: "NOT_FOUND"
    };
    return res.status(404).send(notFoundResp);
});

const port = process.env.APP_PORT || 5010;

logger.info(`Versión: ${packageJson.version}`);
app.listen(port, () => logger.info(`Listening port ${port}`));
