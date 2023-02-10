import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/api-nodeDb", { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))