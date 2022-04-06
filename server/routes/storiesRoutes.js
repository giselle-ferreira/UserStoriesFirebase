const { Router } = require('express');
const router = Router();

const StoryController = require('../controllers/StoryController')


router.get('/', StoryController.listStories);
router.post('/get', StoryController.getStory);
router.post('/create', StoryController.createStory);
router.post('/update', StoryController.updateStory);
router.post('/delete', StoryController.deleteStory);

module.exports = router;
