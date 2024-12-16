import express from "express";
import { Request, Response } from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./MiddleWare/globalErrorHandler";

// declare app variable.
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://funny-kleicha-6202f9.netlify.app","http://localhost:5173"], credentials: true }));


app.get("/",(req:Request,res:Response)=>{
  res.send("Server is running")
})
app.use("/api", routes);

app.use(globalErrorHandler);
// handle invalid route.
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

// export app.
export default app;
