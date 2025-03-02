import dotenv from "dotenv";
import mongoose from "mongoose";
import { categoriesData, productData } from "./seedData.js";
import Product from "./models/product.js";
import Category from "./models/categories.js";


dotenv.config();

async function seedDatabase() {
    try {
        // connect to the database
        await mongoose.connect(process.env.MONGO_URI);

        // delete all data from Product and category
        await Product.deleteMany({});
        await Category.deleteMany({});

        // store && insert all categories data from seedData.js file 
        const categoryDocs = await Category.insertMany(categoriesData);

        // create map for category
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        });

        // storing this category with product
        const productsWithCatrgoryIds = productData.map((product) => ({
            ...product,
            category: categoryMap[product.category],
        }));

        await Product.insertMany(productsWithCatrgoryIds);

        console.log("Database Seeded Succesfully");
        
    } catch (error) {
        console.error("Error seeding databse:", error);
    } finally{
        mongoose.connection.close();
    }
}

seedDatabase();


