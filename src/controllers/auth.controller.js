import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function registerUser(req, res) {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullname, email, password: hashedPassword
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });


    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
}


    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });



    res.status(200).json({
        message: "User LoggedIn Sucessfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })

}

export { registerUser, loginUser };
