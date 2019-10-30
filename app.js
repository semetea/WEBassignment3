const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

const DBURL = "mongodb+srv://Taewoo:@gksxodn3728@cluster0-vsa3s.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DBURL, {useNewUrlParser : true})
.then(()=> {
    console.log(`Database is connected`);
})
.catch(err=>{
    console.log(`Something went wrong :${err}`);
})

app.get("/",(req,res)=> {
    res.render("home");
})

app.post("/",(req,res)=> {
    const Schema = mongoose.Schema;

    const taskSchema = new Schema({
        title: String,
        description: String
    })

    const Tasks = mongoose.model('Tasks',taskSchema);

    const formData = {
        title:req.body.title,
        description:req.body.description
    }

    const ta = new Tasks(formData);
    ta.save()
    .then(()=> {
        console.log(`Task was inserted into database`)
    })
    .catch(err=>{
        console.log(`Task was not inserted into the database because ${err}`)
    })

    res.redirect("/");
});

const PORT = process.env.PORT || 3000
app.listen(PORT,()=> {
    console.log(`The web server has been connected`);
})