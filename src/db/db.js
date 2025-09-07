import mongoose from "mongoose"

function connect(){
    mongoose.connect("mongodb://localhost:27017/food-view")
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log("MongoDB connection error: " , err)
    })
}

export default connect;