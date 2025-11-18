import express from "express";
import aiRoutes from "./routes/ai.route.js";
import cors from "cors"


const app = express();
app.use(cors())
app.use(express.json());
app.use('/ai', aiRoutes);

export default app;
