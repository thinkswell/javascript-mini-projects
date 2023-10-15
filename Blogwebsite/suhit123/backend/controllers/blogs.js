const blogschema=require('../models/blogmodel');
const userschema=require('../models/usermodel');
exports.blogs=async(req,res)=>{
    try{const blogs = await blogschema.find().sort({date: 'descending'});
    if(blogs){    
        res.status(200).json(blogs)}
    else{
        res.status(404).json([]);
    }}
    catch(err){
        res.status(500).json({message:"Something gone wrong!"})
    }
}
exports.sepCustomBlogs=async(req,res)=>{
    const id =req.params.id;
    try{
        const blogs=await blogschema.find({catogary:id});
        if(blogs){    
            res.status(200).json(blogs)}
        else{
            res.status(404).json([]);
        }
    }
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
}
exports.sep_blogs=async(req,res)=>{
    try{const id=req.params.id;
    const sep_data=await blogschema.findById(id);
    console.log(sep_data);
    if(sep_data===undefined){
        res.status(404).json(sep_data);
    }
    res.status(200).send(sep_data);}
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
}
exports.search=async(req,res)=>{
  const query = req.params.id;
  try {
    const blogs = await blogschema.find({
      $or: [
        { heading: { $regex: query, $options: 'i' } }, // Case-insensitive title search
        { smalldescription: { $regex: query, $options: 'i' } },
        {catogary:{$regex:query,$options:'i'}},
        {author:{$regex:query,$options:'i'}}
    ],
    });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
exports.blogs_sep_user=async(req,res)=>{
        try{const username=req.params.username;
        const sep_user_blogs=await blogschema.find({author:username}).sort({date: 'descending'});
        let sep_user=await userschema.findOne({username:username});
        const sep_data=[];
        if(sep_user){sep_user={username:sep_user.username,email:sep_user.email,gender:sep_user.gender};}
        else{
            sep_user={username:'',email:''};
        }
        sep_data.push(sep_user);
        sep_data.push(sep_user_blogs);
        console.log(sep_data);
        if(sep_user_blogs===undefined ||sep_data===undefined){
            res.status(404).json(sep_data);
        }
        res.status(200).send(sep_data);}
        catch(err){
            res.status(500).json({message:"something gone wrong!"})
        }
};
exports.blog_add=async(req,res)=>{
   try{ await blogschema.create(req.body);
    res.status(200).json(req.body);}
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
}
exports.blog_edit=async(req,res)=>{
    try{const id=req.params.id;//to chnage string to integer we use +
    await blogschema.findByIdAndUpdate(id,req.body);
    res.status(200).send(await blogschema.find());}
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
}
exports.blog_del=async(req,res)=>{
    try{const id =req.params.id;
    await blogschema.deleteOne({_id:id});
    res.status(200).send('delted');}
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
};
exports.addComment=async(req,res)=>{
    const id=req.params.id;
    try{
        const comment=await blogschema.findOne({_id:id});
        comment.comments.push({user:req.body.name,comment:req.body.comment});
        await comment.save();
        res.status(201).json({message:"comment added"});
    }
    catch(err){
        res.status(500).json({message:"something gone wrong!"});
    }
}
exports.user=async(req,res)=>{
    const query=req.params.id;
    try{
        const users=await userschema.find({username:{$regex:query ,$options:'i'}});
        if(users){    
            res.status(200).json(users)}
        else{
            res.status(404).json([]);
        }
    }
    catch(err){
        res.status(500).json({message:"something gone wrong!"})
    }
}