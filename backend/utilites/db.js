const mongoose = require('mongoose')


const DBCon=async()=>{
    try {
          mongoose.connect(process.env.MONGODB_URL)
          console.log('Mongodb is connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = DBCon;


