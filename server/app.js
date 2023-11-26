import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import storyRoutes from './routes/stories.js';
import userRoutes from './routes/user.js';
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extended: true })); // 
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true })); //req.body
app.use(cors());
// any route under http://localhost:5001/stories will invoke response in storyRoutes
app.use("/stories", storyRoutes); // middleware for "/stories" -> added prefix route
app.use("/user", userRoutes); // middleware for "/user" -> added prefix route

app.get('/', (req, res) => {
    res.send("Welcome to Instaverse API");
});

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    } catch (err) {
        console.error("Connection to MongoDB failed", err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to database has been established successfully"));
mongoose.connection.on("error", (err) => console.log(err));