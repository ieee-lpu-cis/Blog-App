import mongoose from "mongoose";


const Connection = async () => {
    const URL = 'mongodb://127.0.0.1:27017/test'
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("DBConnection Successful ");
    } catch (error) {
        console.log("Error while making connection with DB ", error);
    }
}

export default Connection;