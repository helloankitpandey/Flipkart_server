import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";


// config for readablity of all env in our application
dotenv.config();


const app = express();

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())

// Routes
app.use("/user", userRoutes);
app.use("/category",categoryRoutes);
app.use("/product", productRoutes);

const start = async() => {
    console.log("Radhe Radhe");
    try {
        app.listen({port: 3000, host: "0.0.0.0" }, (err, addr) => {
            if(err){
                console.log(err);
            } else {
                console.log("Server started on http://localhost:3000");   
            }
        } )
    } catch (error) {
        console.log("Erorr Starting and i.e :", error); 
    }  
};

start();