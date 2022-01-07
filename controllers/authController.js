const mongoose = require('mongoose');
const User = require('./../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signup = async (req, res, next) => {
    try {
        await User.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }

                    else {


                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            timestamp: new Date()
                        }
                        );


                        if (req.body.password != req.body.confirmpassword) {
                            return res.status(401).json({ message: "confirm password is not matching with password" });
                            // console.log("confirm password is not matching with password");
                        }
                        else {
                            user.save().then(result => { res.status(201).json({ message: "User created" }); }).catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            });
                        }



                    }


                });

            }


            else {
                return res.status(401).json({ message: "user is already register" });
                // console.log('user is already register') ;

            }
        });
    } catch (err) {
        throw new Error('Internal server error');
    }
}

exports.login = async (req, res, next) => {


    try {
        await User.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: "Auth failed" });
                    }
                    else if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id

                            },
                            "Secret",
                            {
                                expiresIn: "1h"
                            }
                        );

                        return res.status(200).json({
                            message: "Auth Successful",
                            token: token
                        });

                    }
                    else
                        return res.status(401).json({ message: "Auth failed" });

                });
            }




        });
    } catch (err) { throw new Error("Internal Server Error"); }
}


exports.userdata = async (req, res, next) => {
    try {
        await User.findById({ _id: req.params.userid }, (err, user) => {

            console.log(user);
            return res.status(200).json({ user });


        });

    } catch (err) { throw new Error("Internal Server error"); }

}





exports.updateuser = async (req, res, next) => {
    // console.log(req.body);
    try {
        await User.findByIdAndUpdate(req.params.userid, { name: req.body.name, email: req.body.email }, (err, result) => {

            if (err) { return res.status(401).json({ message: 'Internal server error' }); }
            else {
                console.log(result);
                return next();
                //return res.status(200).json({message:result });

            }
        });

       
    } catch (err) { throw new Error("Internal server error"); }
}

exports.deleteuser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.userid, (err, result) => {
            if (err) { return res.status(500).json({ error: err }); }
            else {

                return res.status(200).json({ message: result });

            }


        });
    } catch (err) { throw new Error("Internal Server Error"); }
}


