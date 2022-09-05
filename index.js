const express = require('express');
const path = require('path');
const port = 8701;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1

// app.use(function(req, res, next){
    
//     req.Myname="Vishwa";
    
//     // console.log('middleware1 called');
//      next();
// });

// middleware 2

// app.use(function(req, res, next){
    
//     console.log('My name from M2', req.Myname)
//     // console.log('middleware2 called');
//     next();
// });

var contactList = [
    {
        name : "Arpan",
        phone : "111111111"
    },
    {
        name : "Tony Stark",
        phone : "2316537634"
    },
    {
         name: "Coding Ninjas",
         phone : "2316537634"
    }
];


app.get('/practice', function(req,res){

   
    return res.render('practice',{
        title:"Contact List",
        contact_list: contactList
    });
});

app.post('/crete-contact', function(req,res){
     
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });  OR,
    
    
    // contactList.push(req.body);
    
    Contact.create({
         name: req.body.name,
         phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('eror in creating a contact!');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');  OR,

    // return res.redirect('back');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);


    // console.log(req);
    // return res.redirect('/practice');
});







app.get('/', function(req,res){

    // console.log('from the get route controller', req.Myname);

    // console.log(__dirname);
    //  res.send('<h1>Cool, running</h1>');

    // Contact.find({name:"new"}

     Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title:"Contact List",
            contact_list: contacts
        });

     })

    // return res.render('home',{
    //     title:"Contact List",
    //     contact_list: contactList
    // });
});


app.get('/delete-contact', function(req, res){
    // console.log(req.params);
    // let phone=req.params.phone;

    // console.log(req.query);
    // get the query from the url

    // let phone=req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if( contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return  res.redirect('back');


    // get the query from the url
    let id=req.query.id;

    // find the contact in the database using
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });
});



// to run

app.listen(port, function(err){
    if(err) { console.log('Error in running the server', err);}

    console.log('Yup! My Express Server is runnin on port:', port);
});