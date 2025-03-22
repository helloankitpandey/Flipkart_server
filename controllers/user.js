import jwt  from "jsonwebtoken";
import User from "../models/user.js";


// creating fun for token-generation
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {userId: user?._id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
    );

    const refreshToken = jwt.sign(
        {userId: user?._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    return {accessToken, refreshToken};
}



const loginOrSignUp = async(req, res) => {
    // taking phone & address from body
    const { phone, address } = req.body;

    try {
        // find user and are exist already or not
        let user = await User.findOne({phone})

        if (!user) {
            // if not exist then creat new user and save it
            user = new User({ address, phone});
            await user.save();
            
        } else {
            // if exist already then update address and save it
            user.address = address;
            await user.save();
        }

        // after this we created token
        const {accessToken, refreshToken } = generateTokens(user.toObject());

        // sending to frontend
        // sending response i.e user, accessToken & refreshToken to ui
        res.status(200).json({
            user,
            accessToken, 
            refreshToken
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
}

export { loginOrSignUp }