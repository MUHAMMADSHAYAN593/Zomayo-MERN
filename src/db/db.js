import mongoose from "mongoose"

function connect(){
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log("MongoDB connection error: " , err)
    })
}

export default connect;