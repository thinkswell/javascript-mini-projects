const express=require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
const { static } = require("express");
const _=require("lodash");
const app=express();
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true})
app.use(express.urlencoded({
  extended: true
}));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const itemSchema={
  name:{
    type:String,
    required:[true],
  }
};
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
  name:"Welcome to your To-Do-List "
});
const item2=new Item({
  name:"Hit the + button to add new item "
});
const item3=new Item({
  name:"<-- Hit this to delete in item "
});
const defaultItems=[item1,item2,item3];
const listSchema={
  name:String,
  items:[itemSchema],
};
const List=mongoose.model("List",listSchema);


app.get("/",function(req,res){
    // let day=date.getdate();
    Item.find({},function(err,founditem){
     if(founditem.length === 0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);     
        }
        else{
          console.log("Success");
        }
      });
      res.redirect("/");
    }
  
else{
  res.render("list",{ListTitle:"Today",newlistitems:founditem});
}
});

});

app.get("/:customListName",function(req,res){
  const customListName= _.capitalize(req.params.customListName);

  List.findOne({name:customListName},function(err,foundList){
    if(err){
      console.log(err);
    }
    else{
       if(!foundList){
        //  console.log("Doesn't found");
        const list=new List({
          name:customListName,
          items:defaultItems,
      
        });
        list.save();
        res.redirect("/"+customListName);
      
       }
       else{
        //  console.log("Exist");
        res.render("list",{ListTitle:foundList.name,newlistitems:foundList.items});
       }
    }
  });
});
app.post("/",function(req,res){
   let itemname = req.body.newitem;
   const  listname=req.body.list;

   const item=new Item({
     name:itemname,
   });
   if(listname === "Today"){
    item.save();
    res.redirect("/");
   }
   else{
     List.findOne({name:listname},function(err,foundlist){
       foundlist.items.push(item);
       foundlist.save();
       res.redirect("/"+listname);
     })
   }
});
app.post("/delete",function(req,res){
    const item_id=req.body.checkbox;
    const listname=req.body.listname;
    if(listname==="Today"){
      Item.findByIdAndRemove(item_id,function(err){
        if(err){
          console.log(err);
        }
        else{
         // console.log("Success");
          res.redirect("/");
        }
      });
    }
    else{
       List.findOneAndUpdate({name:listname},{$pull:{items:{_id:item_id}}},function(err,found){
         if(err){
           console.log(err);

         }
         else{
          res.redirect("/"+listname);
         }
       });
      }
     
    });
//

app.listen(3000,function(){
  console.log("The server is currently running at port 3000");
});