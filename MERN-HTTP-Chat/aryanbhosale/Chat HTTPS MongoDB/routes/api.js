const express = require('express');

const router = express.Router();

const ChatApp = require('../models/chatApp');

// Define Routes in the server
router.get('/', (request, response) => {
    
    ChatApp.find({  }).then((data) => {
        console.log("Data : ", data);
        response.json(data); // Send the response to the client as JSON straight from MongoDB
    }).catch((error) => {
        console.log("ERROR : ", error);
    }); 
});

router.post('/save', (request, response) => {

    console.log("Body : ", request.body);
    const data = request.body;

    const newChatApp = new ChatApp(data);

    newChatApp.save((error) => {
        if(error) {
            response.status(500).json({ msg : 'Sorry. Internal server error.' });
            return;
        }
        // Chat App
        return response.json({
            message : 'Data saved.'
        }); // Send the response to the client as JSON 
    });
});

router.get('/name', (request, response) => {
    const data = {
        username : 'k Bond',
        age : 49
    };
    response.json(data); // Send the response to the client as JSON 
});

module.exports = router;