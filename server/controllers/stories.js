import mongoose from "mongoose";
import Story from "../models/storyContent.js";
import uploadToS3 from "../service/s3Service.js";
import { v4 as uuidv4 } from 'uuid';

// Store all logic(handler function) for all rountes
const getStories = async (req, res) => {
    try {
        const story = await Story.find();
        res.status(200).json(story);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

const createStory = async (req, res) => {

    const body = req.body;
    const imageKey = `images/${uuidv4()}.jpg`;

    try {
        // body.image is data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...
        // so we need to remove the first part (data:image/jpeg;base64,) and keep the second part
        const imageData = Buffer.from(body.image.split(',')[1], 'base64');
        const imageUrl = await uploadToS3(imageData, imageKey);

        const newStory = new Story({
            ...body,
            userId: req.userId,
            postDate: new Date().toISOString(),
            image: imageUrl
        });
        newStory.save();
        res.status(201).json(newStory);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

const updateStory = async (req, res) => {
    const story = req.body;
    const { id: _id } = req.params;

    if(!mongoose.isValidObjectId(_id)){
        return res.status(404).send("This is id doesn't belong to any story");
    }

    const updatedStory = await Story.findByIdAndUpdate(_id, story, { new: true });

    res.json(updatedStory);
}

const deleteStory = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.isValidObjectId(_id)){
        return res.status(404).send("This is id doesn't belong to any story");
    }

    await Story.findByIdAndRemove(_id);

    res.json( {message: "story deleted successsfully"} );
}

const likeStory = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId){
        return res.status(401).send("User is unauthorized");
    }

    if(!mongoose.isValidObjectId(_id)){
        return res.status(404).send("This is id doesn't belong to any story");
    }

    try {
        const result = await Story.updateOne(
            { _id, likes: { $ne: req.userId } }, // Add user ID if not already present
            { $addToSet: { likes: req.userId } }
        );

        if (result.modifiedCount === 0) {
            // User already liked the story, so remove the like
            await Story.updateOne({ _id }, { $pull: { likes: req.userId } });
        }

        const updatedStory = await Story.findById(_id);
        res.json(updatedStory);
    } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).send("Internal Server Error");
    }
}

export { getStories, createStory, updateStory, deleteStory, likeStory };