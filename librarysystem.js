const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
const connect=()=>{

    return mongoose.connect("mongodb+srv://paru:Paru@cluster0.xm3nm.mongodb.net/librarysystem?retryWrites=true&w=majority")
}

const userSchema= new mongoose.Schema({
  firstname:{type:String,required:true},
 lastname:{type:String,required:true}
},
{
    versionkey:true,
    timestamps:true
});


const user=mongoose.model("user",userSchema);

const Section=new mongoose.Schema({
    name:{type:String,require:true},

});

const Sec=mongoose.model("secti",Section)


app.get("/user",async(req,res)=>{
    const users=await user.find().lean().exec()
return res.status(200).send({users:users});
});

app.post("/user",async(req,res)=>{
 try{
    const users=await user.create(req.body)
    return res.send({users:users});
 }
 catch(err){
     console.log(err);
     return res.send(err.message);
 }
});


app.get("/Sec",async(req,res)=>{
     try{
        const secc= await Sec.find().lean().exec()
      return  res.status(200).send({section:secc});
     }
     catch(err){
         res.status(400).send("Somthing went wrong Please try again later.")
     }
});

app.post("/Sec",async(req,res)=>{
    try{
       const secc=await Sec.create(req.body).lean().exec();
  return res.status(200).send({section:secc});
    }
    catch(err){
        res.status(400).send("Something went wrong please try again later")
    }
});

//books------------------------------------------------------------->

const booksstore=mongoose.Schema({
    name:{type:String,require:true},
    body:{type:String,require:true}
});

const bookdata=mongoose.model("book",booksstore)

app.get("/books",async(req,res)=>{
    try{
        const book= await bookdata.find();
        return res.status(200).send({books:book});
    }
    catch(err){
        res.status(400).send("Somthing went wrong")
    }
});

app.post("/books",async(req,res)=>{
    try{
      const books= await bookdata.create(req.body);
      return res.send({books:books})
    }
    catch(err){
        res.send("somthing went wrong.")
    }
})

//author-------------------------------------------------------------->

const authorstore=mongoose.Schema({
    users_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",require:true}
    
});

const authordata=mongoose.model("author",authorstore)

app.get("/author",async(req,res)=>{
    try{
        const authors= await authordata.find();
        return res.status(200).send({author:authors});
    }
    catch(err){
        res.status(400).send("Somthing went wrong")
    }
});

app.post("/author",async(req,res)=>{
    try{
      const authors= await authordata.create(req.body);
      return res.send({Author:authors})
    }
    catch(err){
        res.send("somthing went wrong.")
    }
});


app.patch("/author/:id",async(req,res)=>{
    try{
        const authors= await authordata.findByIdAndUpdate(req.params.id,res.body);
        return res.status(200).send({author:authors});
    }
    catch(err){
        res.status(400).send("Somthing went wrong")
    }
});

app.delete("/author/:id",async(req,res)=>{
    try{
        const authors= await authordata.findByIdAndDelete(req.params.id);
        return res.status(200).send({author:authors});
    }
    catch(err){
        res.status(400).send("Somthing went wrong")
    }
});

const bookauthor=mongoose.Schema({
    user_id:{type:mongoose.Schema.ObjectId,ref:"user",require:true},
    author_id:{type:mongoose.Schema.ObjectId,ref:"author",require:true}
})

const bookauthors=mongoose.model("bookauthor",bookauthor);

app.get("/bookautho",async(req,res)=>{
    try{
        const BA=await bookauthors.find({authorid:author_id}).populate("books_id");
        return res.send({Bookauthor:BA});
    }
    catch(err){
        res.send("Somthing went worng");
    }
 });
 app.post("/bookautho",async(req,res)=>{
    try{
        const BA=await bookauthors.create(req.body);
        return res.send({Bookauthor:BA});
    }
    catch(err){
        res.send("Somthing went worng");
    }
 });


const checkedout=mongoose.Schema({
    user_id:{type:mongoose.Schema.ObjectId,ref:"user",require:true}
})

const checko=mongoose.model("checkout",checkedout);

app.get("/checkout",async(req,res)=>{
    try{
        const check=await checko.find()
        return res.send({check:check});
    }
    catch(err){
        res.send("Somthing went worng");
    }
 });

 app.post("/checkout",async(req,res)=>{
    try{
        const check=await checko.create(req.body);
        return res.send({check:check});
    }
    catch(err){
        res.send("Somthing went worng");
    }
 });

app.listen(5112,async()=>{
    try{
    await connect();
    
    console.log("Listening port 5112");
    }
    catch(err){
        console.log(err);
    }
  
});