import dotenv from 'dotenv';
dotenv.config();
import express from 'express'; // gọi thư viện express
const server = express(); // dùng thư viện express tạo ra server

import bodyParser from 'body-parser';
server.use(bodyParser.json());

import routerConfig from "./routes";
server.use("/api", routerConfig)
import viewConfig from "./views"
server.use(viewConfig);
/* Yêu cầuu server lắng nghe tại cổng cổng 3000 trên máy */
server.listen(process.env.PORT, () => {
    console.log("Server is running at port", process.env.PORT)
})