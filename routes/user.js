import express from "express"
import { loginOrSignUp } from "../controllers/user.js";

const router = express.Router();

// router.get("/get", (req, res) => {
//     res.status(200).json({
//         Radhe: true
//     })
// });

// User Login routes


router.post("/login", loginOrSignUp)

export default router;