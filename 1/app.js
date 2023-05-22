const express = require('express');
const app = express();
const port = 3000;


// a create DB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://avora9721:aryan9721@cluster0.wldme88.mongodb.net/Student?retryWrites=true&w=majority', { useNewUrlParser: true });

// b Create Collection
const studentSchema = mongoose.Schema({
    Name: String,
    rollNo: Number,
    WAD: Number,
    CC: Number,
    DSBDA: Number,
    CNS: Number
})
const StudentMarks = mongoose.model('StudentMarks',studentSchema);

// c Insert Document

const  Documents = [
    {
        Name: 'Aryan',
        rollNo: 101,
        WAD: 90,
        CC: 23,
        DSBDA: 74,
        CNS: 23
    },    {
        Name: 'Atharva',
        rollNo: 102,
        WAD: 74,
        CC: 12,
        DSBDA: 86,
        CNS: 34
    },    {
        Name: 'Jayesh',
        rollNo: 103,
        WAD: 92,
        CC: 24,
        DSBDA: 35,
        CNS: 73
    },
];


const insert = async () =>{
    try {
        const result = StudentMarks.insertMany(Documents)
        console.log("Data inserted Succesfully")
    } catch (error) {
        console.error(error);
    }
}
// insert();

// d  visit localhost:3000/api/getall
app.get('/api/getall',async (req,res)=>{
    try {
        const result = await StudentMarks.find();
        var output = "<h1>Total Count: "+ result.length +"</h1>"
        result.forEach(item => {
            output+="Name: " + item.Name+"<br>";
            output+="Roll Number: " + item.rollNo+"<br>";
            output+="WAD: " + item.WAD+"<br>";
            output+="DSBDA: " + item.DSBDA+"<br>";
            output+="CC: " + item.CC+"<br><br>";
        });
        res.send(output)
    } catch (error) {
        console.error(error);
    }
})


// e 
app.get('/api/dsbda', async(req,res)=>{
    try {
        const result = await StudentMarks.find({DSBDA: {$gt:20}})
        var output = "<h1>Total Count: "+ result.length +"</h1>"
        result.forEach(item => {
            output+="Name: " + item.Name+"<br>";
            output+="Roll Number: " + item.rollNo+"<br>";
            output+="WAD: " + item.WAD+"<br>";
            output+="DSBDA: " + item.DSBDA+"<br>";
            output+="CC: " + item.CC+"<br><br>";
        });
        res.send(output)
    } catch (error) {
        console.error(error);
    }
})


// f update by 10
app.put('/api/update/:rollNo',async (req,res)=>{
    try {
        const filter = {rollNo: req.params.rollNo};
        const update = {$inc:{DSBDA: 10, WAD: 10,CC:10, CNS:10}};
        const result = await StudentMarks.updateMany(filter,update);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('internal server error')
    }
})

//g list more tha 25 in all subject
app.get('/api/topper',async (req,res)=>{
    try {
        const result = await StudentMarks.find({$and: [{DSBDA: {$gt: 50}},{CC: {$gt: 50}},{CNS: {$gt: 50}},{WAD: {$gt: 50}} ]}).select({Name: 1})
        var output = "<h1>Total Count: "+ result.length +"</h1>"
        result.forEach(item => {
            output+="Name: " + item.Name+"<br>";
        });
        res.send(output)
        // res.send(result);        
    } catch (error) {
        console.error(error);
        res.status(500).send("internal serve eror")
    }
})


//h list less than 40 in WAD and CC
app.get('/api/week',async (req,res)=>{
    try {
        const result = await StudentMarks.find({$and: [{CC: {$lt: 40}}, {DSBDA: {$lt: 40}} ]}).select({Name: 1})
        var output = "<h1>Total Count: "+ result.length +"</h1>"
        result.forEach(item => {
            output+="Name: " + item.Name+"<br>";
        });
        res.send(output)
        // res.send(result);        
    } catch (error) {
        console.error(error);
        res.status(500).send("internal serve eror")
    }
})

//i delete a entry
app.delete('/api/delete/:rollNo',async(req,res)=>{
    try {
        const filter = {rollNo: req.params.rollNo};
        const result = await StudentMarks.deleteOne(filter);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('iternal server error');
    }
})

//j display in table
app.get('/api/show',async(req,res)=>{
    try {
        const result = await StudentMarks.find();
        var output = '<head><style>table, th, td {border: 1px solid black;}</style></head><table><tr><th>Name</th><th>Roll</th><th>DSBDA</th><th>WAD</th><th>CC</th><th>CNS</th></tr>';
        result.forEach(element => {
            output+='<tr><td>'+element.Name+'</td>'
            output+='<td>'+element.rollNo+'</td>'
            output+='<td>'+element.DSBDA+'</td>'
            output+='<td>'+element.WAD+'</td>'
            output+='<td>'+element.CC+'</td>'
            output+='<td>'+element.CNS+'</td></tr>'
        });
        output+='</table>';
        res.send(output);
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
