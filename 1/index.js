const express  = require("express");
const mongoose = require("mongoose");
const app = express()

//create connection and DB
mongoose.connect("mongodb+srv://avora9721:aryan9721@cluster0.wldme88.mongodb.net/Student?retryWrites=true&w=majority")
.then(()=> console.log("Connection successful"))
.catch((err)=>console.log(err))

//create collection with a schema
const studentMarks  = new mongoose.Schema({
    name: String,
    rollNo: Number,
    WAD: Number,
    CC: Number,
    DSBDA: Number,
    CNS: Number
})
const Student= new mongoose.model("StudentMarks",studentMarks)

//function to enter data
const createDocument = async() =>{
    try {
        const aryan = new Student({
            name: "jayesh",
            rollNo: 105,
            WAD: 90,
            CC: 80,
            DSBDA: 30,
            CNS: 60
        })
        const atharva = new Student({
            name: "raj",
            rollNo: 106,
            WAD: 30,
            CC: 20,
            DSBDA: 20,
            CNS: 30
        })
        //insert many data
        const result  = await Student.insertMany([aryan,atharva]);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// createDocument();

const getData = async () =>{
    const result = await Student.find({$and:  [{DSBDA: {$gt: 50}}, {WAD: {$gt: 50}}, {CC: {$gt: 50}}, {CNS: {$gt: 50}} ]  })
    // .select({name:1})
    ;
    console.log(result);
}

getData();

app.listen(5000,()=>{
    console.log("server started on 5000")
})