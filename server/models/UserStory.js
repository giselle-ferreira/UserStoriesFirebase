class UserStory {
    constructor(storyId, description){
        this.storyId = storyId;
        this.description = description;
    }

    plainObject(){
        return {
            storyId: this.storyId,
            description: this.description
        }
    }
}

module.exports = UserStory;