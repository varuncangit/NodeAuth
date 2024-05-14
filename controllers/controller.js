import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {transporter} from "../config/nodeMailer.js";
import dotenv from "dotenv";
dotenv.config();

export  class UserGetController {
    getSignUpPage = (req, res) => {
        res.render("signup",{ message: "" });
    }

    getSignInPage = (req, res) => {
        res.render("signin", { message: "" });
    }

    home = (req, res) => {
        const email = req.session.userEmail;
        if (!email) {
            return res.status(404).render("signin",{message:"Please sign in to view the home"});
        }
        res.render("home");
    }

    getForgotPassword = (req, res) => {
        res.render("forgotPassword", { message: "" });
    }

    getChangePassword = (req, res) => {
        const email = req.session.userEmail;
        if (!email) {
            return res.status(404).render("signin",{message:"Please sign in to change the password"});
        }
        res.render("changePassword", { message: "" });
    }

    logoutUser = (req, res) => {
        // req.logout();
        req.session.destroy((err) => {
            if (err) {
                console.error('Error signing out:', err);
                res.status(500).send('Error signing out');
            } else {
                res.status(201).render('signin',{message:"user logout"}); // Redirect to the sign-in page after signing out
            }
        });
    }

}

export  class UserPostController {
    
    //sign up
    createUser = async (req, res) => {
        const { username, email, password,cpassword } = req.body;
        if (password !== cpassword) {
            return res.status(400).render("signup",{message:"Passwords don't match"});
        }
        //check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).render("signup",{message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email,password:hashedPassword });
        try {
            await newUser.save();
            res.status(201).render("signin",{message:"User created successfully"});
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    };

    //sign in
    signInUser = async (req, res) => {
        const { email, password } = req.body;
        //Recaptcha
        const recaptcha = req.body['g-recaptcha-response'];

        if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
            return res.status(404).render("signin",{message:"Please select captcha"});
        }

        try {
            const existingUser = await User.findOne({ email: email});
            
            if (!existingUser) 
            return res.status(404).render("signin",{message:"User doesn't exist"});
        
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            
            if (!isPasswordCorrect)
                return res.status(400).render("signin",{message:"Invalid credentials || Incorrect Password"});
            req.session.userEmail = email;
            res.redirect('/user/home');
            
        }
        catch (error) {
            res.status(500).render("signin",{message:error.message});
            
        }
    }

    //forgot password
    //forgot password
forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) 
            return res.status(404).render("forgotPassword",{message:"User doesn't exist"});

        // Generate a new random password
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Send the email
        try {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                text: `Your new password is: ${newPassword}`
            });
            // Update user's password in the database
            existingUser.password = hashedPassword;
            await existingUser.save();
            
            // Render success message
            return res.status(201).render("signin",{message:"New Password sent to your email"});
        } catch(error) {
            console.log(error);
            return res.status(500).render("forgotPassword",{message:"Error sending email"});
        }
    }
    catch (error) {
        res.status(500).render("forgotPassword",{message:error.message});
    }
}


    //change password
    changePassword = async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        try {
            const email = req.session.userEmail;
            const existingUser = await User.findOne({ email: email });
            if (!existingUser) 
                return res.status(404).render("changePassword",{message:"User doesn't exist"});

            const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
            if (!isPasswordCorrect)
                return res.status(400).render("changePassword",{message:"Invalid credentials"});

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            res.status(201).render("signin",{message:"Password changed successfully"});
        }
        catch (error) {
            res.status(500).render("changePassword",{message:error.message});
        }
    }


}
