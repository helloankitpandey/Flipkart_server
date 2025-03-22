import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import connectDB from "./config/connect.js";
import { PORT } from "./config/config.js";
import { buildAdminJS } from "./config/setup.js";



// config for readablity of all env in our application
// dotenv.config();


const app = express();

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())

// Routes
app.use("/user", userRoutes);
app.use("/category",categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

const start = async() => {
    console.log("Radhe Radhe");
    try {

        // CONNECTING TO MONGODB
        await connectDB(process.env.MONGO_URI);

        // 
        await buildAdminJS(app);

        app.listen({port: PORT , host: "0.0.0.0" }, (err, addr) => {
            if(err){
                console.log(err);
            } else {
                console.log(`Server started on http://localhost:${PORT}/admin`);   
            }
        } )
    } catch (error) {
        console.log("Erorr Starting and i.e :", error); 
    }  
};

start();