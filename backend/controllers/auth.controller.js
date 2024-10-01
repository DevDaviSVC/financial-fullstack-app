import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { name, username, password, confirmPassword } = req.body;

        // verify username exists
        const verifyUsername = await User.findOne({username});
        if (verifyUsername) return res.status(400).json({error: "This username already exists!"});

        // verify if the passwords match
        if (password !== confirmPassword) return res.status(400).json({error: "Passwords do not match!"});

        // verify if the password is longer than 6 characters
        if (password.length < 6) return res.status(400).json({error: "Password is too weak."});

        // HASH GOES HERE
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Automatic profilePic goes here
        const profilePic = `https://avatar.iran.liara.run/public?username=${username}`;

        const newUser = {
            name,
            username,
            confirmPassword,
            password: hashPassword,
            profilePic
        };

        await User.create(newUser);

        const user = await User.findOne({username}).select("-password");

        // Generate JWT token goes here
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({message: "Account created successfully!", user});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
}

export const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        // verify username exists
        const user = await User.findOne({username});
        if (!user) return res.status(404).json({error: "Username doesn't exist."});
        
        // compare hashed password goes here
        const comparePassword = await bcrypt.compare(password, user?.password || "");
        if (!comparePassword) return res.status(400).json({error: "Incorrect password!"});

        const loggedUser = await User.findOne({username}).select("-password");

        // set jsonwebtoken goes here
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({message: `Logged in as ${loggedUser.name}`, user: loggedUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
}

export const logout = async (req, res) => {
    try {
        
        res.cookie("jwt", "", {maxAge: 0});

        res.status(200).json({message: "Logged out successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
}