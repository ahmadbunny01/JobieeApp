import express from "express";
const app = express();
import morgan from "morgan";
import "express-async-errors";
import { config } from "dotenv";
import { createServer } from "http";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import connectDB from "./utils/database.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import auth from "./middlewares/auth.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = createServer(app);
const port = process.env.PORT || 8000;

//Middlewares
config({ path: "config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobRouter);

if (process.env.NODE_ENV === "production") {
  //Static Files
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

//----------------------------------------------//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Server
try {
  connectDB(process.env.MONGO_URL)
    .then(() => {
      console.log("DataBase Connection Successful");
      try {
        server.listen(port, () => {
          console.log(
            `Server Is Running On Port ${port} In ${process.env.NODE_ENV} Mode.`
          );
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.log("DataBase Connection Unsuccessful");
      console.log(process.env.MONGO_URL);
    });
} catch (error) {
  console.log(error);
}
