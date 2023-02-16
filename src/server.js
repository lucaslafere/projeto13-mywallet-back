import express, { json, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import receiptsRouter from "./routes/receiptsRouter.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

server.use(userRouter);
server.use(receiptsRouter);

server.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);
