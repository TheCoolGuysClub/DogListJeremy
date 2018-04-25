const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Dog} = require('./models/dog.js');
const hbs = require(`hbs`);
const path = require(`path`);
const _ = require(`lodash`);
const methodOverride = require(`method-override`);
const multer = require('multer');
const upload = multer({dest: './public/images'})

const app = express();

//hbs set up
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../app/views'));
// hbs.registerPartials(path.join(path.join(__dirname,'../app/views/partials')));
//setup
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
const database = process.env.MONGODB_URI || "mongodb://localhost:27017/Doglist"
mongoose.connect(database)
  .then(() => {
    console.log('connected to database');
  }).catch(() => {
    console.log('unable to connect to database');
  })
//-------------------middle ware---------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride(`_method`));
app.use(express.static(path.join(__dirname,`../public`)));
app.get('/', (req, res) => {
  res.redirect(`/dogs/home`)
  // res.send("GET /");
})

app.post('/dogs', upload.single('picture'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

//-------------------middle ware---------------------

app.get('/', (req, res) => {
  res.render('./dogs/home');
})

app.get(`/dogs`,(req,res)=>{

  Dog.find()
  .then(dogs=>{
    res.send(dogs);
  })
  .catch(e=>{
    res.status(404).send();
  })
})

app.get(`/dogs/new`,(req,res)=>{
  res.render(`./dogs/new`);
});
app.get(`/dogs/home`,(req,res)=>{
  Dog.find()
  .then((dogs) => {
    res.render(`./dogs/home`,{dogs})
  })
})




app.post('/dogs', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let picture = req.body.picture;
  let personality = req.body.personality;
  let description = req.body.description;
  if(!req.body.name||!req.body.age){
    console.log("bad request");
    res.status(400).send();
  }else{
    const dog = new Dog({
      name: req.body.name,
      age: req.body.age,
      picture: req.body.picture,
      personality: req.body.personality,
      description: req.body.description
    })
    dog.save()
    .then(dog => {
      res.redirect('/dogs/home');
    })
    .catch(e => {
      res.status(400).send();
    })}
  })


  app.post('/dogs/:id', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let picture = req.body.picture;
    let personality = req.body.personality;
    let description = req.body.description;

      const dog = new Dog({
        name: req.body.name,
        age: req.body.age,
        picture: req.body.picture,
        personality: req.body.personality,
        description: req.body.description
      })
      dog.save()
      .then(dog => {
        res.redirect('/dogs/home');
      })
      .catch(e => {
        res.status(400).send();
      })
    })






app.delete(`/dogs/:id`,(req,res)=>{
  const id = req.params.id;
  Dog.findByIdAndRemove(id)
    .then(Dogs => {
      res.redirect(`home`)
    }).catch (e => {
      res.status(404).send(e);
    })
  })

  app.patch('/dogs/:id', (req, res) => {
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      Dog.findByIdAndUpdate(id,body)
        .then(Dog => {

          if (!Dog) {
            res.status(404).send()
          } else {
            // res.send(Dog);
            res.redirect(`/dogs/${id}`);
          }

        }).catch(e => {
          res.status(404).send(e);
        })
  })



app.get(`/dogs/:id`,(req,res)=>{
    const id= req.params.id;

    Dog.findById(id)
    .then(dog=>{

    res.render(`./dogs/show.hbs`,{dog});
  }).catch(e=>{
      res.status(404).send(e);
    })
})
app.get(`/dogs/:id/update`,(req,res)=>{
  Dog.findById(req.params.id).then((dog)=>{
    res.render(`./dogs/update`,{dog})
  })
  .catch(e=>{
      res.status(404).send(e);
    })
})



app.listen(port, () => {
  console.log( `Listening on port ${port}`);
})
//
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const {Dog} = require('./models/dog.js');
// const hbs = require(`hbs`);
// const path = require(`path`);
// const _ = require(`lodash`);
// const methodOverride = require(`method-override`);
// const app = express();
//
// //hbs set up
// app.set('view engine','hbs');
// app.set('views',path.join(__dirname,'../app/views'));
// hbs.registerPartials(path.join(path.join(__dirname,'../app/views/partials')));
// //setup
// const port = process.env.PORT || 3000;
// mongoose.Promise = global.Promise;
// const database = process.env.MONGODB_URI || "mongodb://localhost:27017/Doglist"
// mongoose.connect(database)
//   .then(() => {
//     console.log('connected to database');
//   }).catch(() => {
//     console.log('unable to connect to database');
//   })
// //-------------------middle ware---------------------
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(methodOverride(`_method`));
// app.use(express.static(path.join(__dirname,`../public`)))
// app.get('/', (req, res) => {
//   res.redirect(`/dogs/home`)
//   // res.send("GET /");
// })
//
// //-------------------middle ware---------------------
//
// app.get('/dogs',(req,res)=>{
//
//   Dog.find()
//   .then(dogs=>{
//     res.send(dogs);
//   })
//   .catch(e=>{
//     res.status(404).send();
//   })
// })
//
// app.get(`/dogs/new`,(req,res)=>{
//   res.render(`./dogs/new`);
// });
// app.get(`/dogs/home`,(req,res)=>{
//   Dog.find()
//   .then((dogs) => {
//     res.render(`./dogs/home`,{dogs})
//   })
// })
//
//
//
//
// app.post('/dogs', (req, res) => {
//   let name = req.body.name;
//   let age = req.body.age;
//   let picture = req.body.picture;
//   let personality = req.body.personality;
//   let description = req.body.description;
//   if(!req.body.name||!req.body.age){
//     console.log("bad request");
//     res.status(400).send();
//   }else{
//     const dog = new Dog({
//       name: req.body.name,
//       age: req.body.age,
//       picture: req.body.picture,
//       personality: req.body.personality,
//       description: req.body.description
//     })
//     dog.save()
//     .then(dog => {
//       res.redirect('/dogs/home');
//     })
//     .catch(e => {
//       res.status(400).send();
//     })}
//   })
//
//
// app.delete('/dogs/:id',(req,res)=>{
//   const id = req.params.id;
//   Dog.findByIdAndRemove(id)
//     .then(Dogs => {
//       res.redirect('home')
//     }).catch (e => {
//       res.status(404).send(e);
//     })
//   })
//
//   app.patch('dogs/:id', (req, res) => {
//     const id = req.params.id;
//     const body = _.pick(req.body, ['name', 'age','description','personality','picture']);
//
//     Dog.findByIdAndUpdate(id, {$set: body}, {new: true})
//       .then(Dog => {
//         if (!Dog) {
//           res.status(404).send()
//         } else {
//           res.send(Dog);
//         }
//
//       }).catch(e => {
//         res.status(404).send(e);
//       })
//   })
//
//
//
// app.get('/dogs/:id',(req,res)=>{
//     const id= req.params.id;
//     console.log(id);
//     Dog.findById(id)
//     .then(dog=>{
//       console.log(dog);
//     res.render('./dogs/show.hbs',{dog});
//   }).catch(e=>{
//       res.status(404).send(e);
//     })
// })
// app.listen(port, () => {
//   console.log( `Listening on port ${port}`);
// })
