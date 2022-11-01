const mongoose = require('mongoose');


const dbConn = async(DATABASE_URL) =>{
    try {
        const DB = {
            dbName: "DrAppointmentDatabase"
        }
        await mongoose.connect(DATABASE_URL, DB);
        console.log("DATABASE connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConn;