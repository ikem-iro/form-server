const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URI);
        console.log(`Database connected ${conn.connection.host}`.rainbow.underline);
    }catch(error){
        console.log(`${error} Could not connect to database`);
        process.exit(1);
    }
}



module.exports = connectDB;