const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
 
 var conString ="mongodb://127.0.0.1:27017";
 const app = express();

 app.use(cors());
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());

 app.get('/get-users',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-users").find({}).toArray().then(documents=>{
          res.send(documents);
          res.end();
        });
     });
 });

 app.get('/get-admin',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-admin").find({}).toArray().then(documents=>{
          res.send(documents);
          res.end();
        });
     });
 });

 app.get('/get-categories',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-categories").find({}).toArray().then(documents=>{
          res.send(documents);
          res.end();
        });
     });
 });

 app.get('/get-videos',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-videos").find({}).toArray().then(documents=>{
          res.send(documents);
          res.end();
        });
     });
 });

 app.get('/get-video/:id',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-videos").findOne({VideoId:parseInt(req.params.id)}).then(document=>{
          res.send(document);
          res.end();
        });
     });
 });

 app.get('/get-videos/:categoryId',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-videos").findOne({categoryId:parseInt(req.params.id)}).then(document=>{
          res.send(document);
          res.end();
        });
     });
 });
 app.get('/get-video/:Title',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");

        database.collection("get-videos").findOne({title:req.params.Title}).then(document=>{
          res.send(document);
          res.end();
        });
     });
 });

 app.post('/add-user',(req,res)=>{
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }

    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("videoLiberary");
         database.collection('get-users').insertOne(user).then(()=>{
            console.log('User Registered..');
            res.end();
         });
    });
 })
 app.post('/add-admin',(req,res)=>{
   var admin = {
       UserId: req.body.UserId,
       Password: req.body.Password,
   
   }

   mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");
        database.collection('get-admins').insertOne(admin).then(()=>{
           console.log('admin Registered..');
           res.end();
        });
   });
})

app.post('/add-categories',(req,res)=>{
   var categories = {
       UserId: req.body.UserId,
       Password: req.body.Password,
   
   }

   mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");
        database.collection('get-categories').insertOne(categories).then(()=>{
           console.log('category added..');
           res.end();
        });
   });
})

 app.post('/add-video',(req,res)=>{
    var video = {
        VideoId:parseInt(req.body.VideoId),
        Title:req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes:parseInt(req.body.Likes),
        Dislikes:parseInt(req.body.Dislikes),
        Comments:req.body.Comments,
        categoryId:req.body.categoryId

    }

    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("videoLiberary");
         database.collection('get-videos').insertOne(video).then(()=>{
            console.log('video added..');
            res.end();
         });
    });
 })

 app.put('/edit-video/:id',(req,res)=>{
    var video = {
        VideoId:parseInt(req.body.VideoId),
        Title:req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes:parseInt(req.body.Likes),
        Dislikes:parseInt(req.body.Dislikes),
        Comments:req.body.Comments,
        categoryId:req.body.categoryId

    }
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");
        database.collection('get-videos').updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
           console.log('video uadated..');
           res.end();
        });
   });

 });
 app.delete('/delete-video/:id', (req, res)=>{

   mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("videoLiberary");
        database.collection('get-videos').deleteOne({AppointmentId:parseInt(req.params.id)}).then(()=>{
           console.log('Appointment Deleted..');
           res.end();
        });
   });
});

app.listen(1010);
console.log(`Server Started http://127.0.0.1:1010`);