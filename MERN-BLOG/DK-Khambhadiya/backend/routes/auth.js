const router = require("express").Router();
const User = require("../models/user.model");

//auth with google
router.route("/login").post((req, res) => {
    const { username, socialId } = req.body;

    // Find or create a new user and send it as response
    User.findOne({ socialId: socialId })
        .then((foundUser) => {
            if (foundUser) {
                res.json(foundUser);
            } else {
                const newUser = new User({
                    username: username,
                    socialId: socialId,
                });
                newUser
                    .save()
                    .then(() =>
                        User.findOne({
                            socialId: socialId,
                        }).then((foundNewUser) => res.json(foundNewUser))
                    )
                    .catch((err) => res.status(400).json("Error: " + err));
            }
        })
        .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
