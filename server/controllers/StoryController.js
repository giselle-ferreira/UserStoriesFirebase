const UserStory = require('../models/UserStory')
const db = require('./../firebase')
const admin = require('firebase-admin')


class StoryController { 

    static async createStory(req, res){
        const { storyId, description } = req.body

        if(!(storyId && description)){
            res.status(402).json({
                message: 'Parâmetro(s) necessário(s) nulo(s)'
            });
            return;
        }

        try {
            const newUserStory = new UserStory(storyId, description);

            await db.collection("user-stories").doc(storyId).set(newUserStory.plainObject());

            res.status(201).json({
                message: `Novo UserStory [${storyId}] criado.`,
                userstory: newUserStory
            });

        }catch(err){
            console.log(err);
            res.status(404).json({ message: 'Ocorreu um erro', error: err });
        }  
        
    }


    static async listStories(req, res){

        try {
            const stories = await db.collection("user-stories").get();

            res.json({
                stories: stories.docs.map((i) => i.data()),
            });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Ocorreu um erro",
                error: err.code,
            });
        }
    }


    static async getStory(req, res){
        const { storyId } = req.body

        if(!storyId){
            res.status(402).json({ message: 'Parâmetro necessário nulo.'});
            return;
        }

        try {
            const userstory = await db.collection("user-stories").doc(storyId).get();

            if(!userstory.exists){
                res.status(400).json({ message: `UserStory [${storyId}] não existe.`});
                return;
            }

            res.json({
                message: `UserStory [${storyId}] encontrado`,
                userstory: userstory.data(),
            });

        } catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Ocorreu um erro",
                error: err.code,
            });
        }
    }


    static async updateStory(req, res){
        const { storyId, description } = req.body

        if(!(storyId && description)){
            res.status(402).json({
                message: 'Parâmetro(s) necessário(s) nulo(s)'
            });
            return;
        }

        try {
            const userStoryUpdated = new UserStory(storyId, description);

            await db.collection("user-stories").doc(storyId).update(userStoryUpdated.plainObject())

            res.status(201).json({
                message: `UserStory [${storyId}] atualizado.`,
                userStoryUpdated: userStoryUpdated
            });

        }catch(err){
            console.log(err);
            res.status(404).json({ message: 'Ocorreu um erro', error: err });
        } 
    }


    static async deleteStory(req, res){
        const { storyId } = req.body

        if(!storyId){
            res.status(402).json({
                message: 'Parâmetro(s) necessário(s) nulo(s)'
            });
            return;
        }

        const userStoryToDelete = db
        .collection("user-stories")
        .doc(storyId)
        .delete()
        .then(function () {
            res.status(201).json({ message: `UserStory [${storyId}] deletado.`});
            return;
        })
        .catch(function(err) {
            res.status(404).json({ message: 'Ocorreu um erro', error: err });
            return;
        })

        // try {
        //     const userStoryToDelete = await db.collection("user-stories").doc(storyId).delete()

        //     res.status(201).json({
        //         message: `UserStory [${storyId}] deletado.`
        //     });

        // }catch(err){
        //     console.log(err);
        //     res.status(404).json({ 
        //         message: 'Ocorreu um erro',
        //         error: err
        //     });
        // } 
        
    }
}

module.exports = StoryController;