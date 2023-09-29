const mongoose=require('mongoose')
const connectDB = async ()=>{ 
    try {
        mongoose.set('strictQuery',false)
const URI='mongodb://127.0.0.1:27017/'
        const connect = await mongoose.connect(URI)


        console.log(`DataBase connected : ${connect.connection.host}`)

    } catch (error) {
        console.log( 'mongoose config error : ',error)
    }
}

module.exports = connectDB;