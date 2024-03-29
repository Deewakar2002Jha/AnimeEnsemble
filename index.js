// we write all are backend code here

// first we need to setthe port number on which are website will run
// by default the port number for runing react appliction is port:3000.
// setting the port number for appliction
const port = 4000;

// we are also adding all are dependence for our appliction

const express = require("express");

// now we creating our app instance for application

const app = express();

const mongoose = require("mongoose");

// now we initialisation json webtoken for authentication
//jwt= jsonwebtoken("comment to install is = npm install jsonwebtoken")
const jwt = require("jsonwebtoken");

// now we initialisation multer for storing image in database
const multer = require("multer");

// we are creating path for express server
const path = require("path");
// now we initialisation cors for takeing permission to access the backend
const cors = require("cors");
// The line app.use(express.json()); is a middleware function in a Node.js Express application. It is responsible for parsing incoming request bodies in JSON format.
app.use(express.json());
// by using this our react appliction connect to express on 4000 port
app.use(cors());

// now we are initialisation our database we need to create a mongoDB atless database

//Database Connection with mongoose
//mongodb+srv://deewakarjha0541:<password>@cluster0.tavhvyc.mongodb.net/
//password=1450200215 for backup
mongoose.connect("mongodb+srv://deewakarjha0541:1450200215@cluster0.qrjyuyt.mongodb.net/e-commerce");


//API creation or endpoint

//now creating the api

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// now creating a api to add product in our database using multer
// Image Storeage Engine

const storage = multer.diskStorage({
    destination: '/upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//now creating upload function in multer
const upload = multer({storage:storage})

//Creating Upload Endpoint For Images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    });
});

//now we create endpoint to add data in mongoDb in atlas

//Schema for Creating Product
//Name of table and colums in database
const Product = mongoose.model("Product",{
    //if id is not available then it will not added in database
    id:{
        type: Number,
        required:true,
    },
    //if name is not available then it will not added in database
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }

})

//now we are creating a method to and add product in cart

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        // id:req.body.id,
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    // if we want to save data in datebase we use await function
    await product.save();
    console.log("saved");
    //for creating respose for front end
    res.json({
        success:true,
        name:req.body.name,
    })


})
//Creating API for Deleting Product

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})
//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("ALL Product Fetched");
    res.send(products); 
})
// now we creating multiple api for user login and add to cart function in database
//now we creating api for user creation for database

//shema creating for user model

const Users = mongoose.model('User',{
    //now we are providing the object
    name:{
        type : String,
    },
    email:{
        type: String,
        //after we set unique id then a user canot create two account form one email id
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }

})

//creating the End point for resgistertion for the USER
app.post('/signup',async(req,res)=>{
    //now we checking that email or id is already exit or not in the database
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"Email Id Already Exits"});
    }
    let cart = {};
    
    for (let i=0; i < 300; i++){
        cart[i] = 0;
    }
    //now the can create it
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    // now we are saving the user inside the database
    await user.save();

    // we are USing the JWT authentication for varification of the user
    const data = {
        user:{
            id:user.id
        }
    }

    // now we are creating the token for authentication
    // now we using salt method for encrytion of data by one layer

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

//creating the ENDpoint for the user Login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({suceess:false,error:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"});
    }
});




app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})


