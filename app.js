var express = require('express');
var path = require('path');
var fs = require('fs'); 
var app = express();
var flag1=false;
var flag=true;



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render("login",{error:""});
  flag1=false;
  
})

//Login part
app.post('/', function(req, res){
  var x = req.body.username;
  var y = req.body.password;
  //var flag1= false;
  if(x!='' && y!=''){
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==x && d[i]["pass"]){
      flag1=true;
    }
  }
  if(flag1==true){
    res.render('home');
  }
  else{
    //window.alert("Invalid Credentials");
    res.render("login",{error:"Invalid Credentials"});
    //pop up say invalid credentials
  }

}
else{
 // window.alert("Please enter username and password");
  res.render("login",{error:"Please enter username and password"});
  //pop up please enter name and password
}

})

app.get('/home', function(req, res){
  res.render('home');
})

app.get('/registration', function(req, res){
  res.render("registration",{error:""});
   flag=true;
})


//Registeration Part
app.post('/Register', function(req, res){
  var n = req.body.username;
  var m = req.body.password;
  flag=true;
 // var flag=true;
  var l= JSON.parse(fs.readFileSync("Database.json")).length;
  if(n!='' && m!=''){
    var D = JSON.parse(fs.readFileSync("Database.json"));
    var i;
for (i = 0; i < l; i++) {
  if(D[i]["name"]==n){
    flag=false;
  }
}
  if(flag==true){
    var newuser = {name:n, pass:m};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq.push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
    res.render('home');
    }
    else{
      res.render('registration',{error:"Username is already used"});
    }
  }
    else{
      res.render('registration',{error:"Please fill in the required fields"});
    }
  })

app.get('/searchresults', function(req, res){
  res.render('searchresults');
})


app.get('/novel', function(req, res){
  res.render('novel');
})

app.get('/flies', function(req, res){
  res.render('flies');
})

app.get('/grapes', function(req, res){
  res.render('grapes');
})

app.get('/poetry', function(req, res){
  res.render('poetry');
})

app.get('/leaves', function(req, res){
  res.render('leaves');
})

app.get('/sun', function(req, res){
  res.render('sun');
})

app.get('/fiction', function(req, res){
  res.render('fiction');
})

app.get('/dune', function(req, res){
  res.render('dune');
})

app.get('/mockingbird', function(req, res){
  res.render('mockingbird');
})

app.get('/readlist', function(req, res){
  res.render('readlist');
})



const books =[
  {name: 'dune'},
  {name: 'grapes'},
  {name: 'leaves'},
  {name: 'flies'},
  {name: 'mockingbird'},
  {name: 'sun'},
];
const name =[
  {name: 'Dune'},
  {name: 'The Grapes of Wrath '},
  {name: 'Leaves of Grass '},
  {name: 'Lord of the Flies '},
  {name: 'To Kill a Mockingbird '},
  {name: 'The Sun and Her Flowers '},

]


app.post('/search',function(req,res){
  var x = req.body.Search;
  const arr= [];
  const full =[];
  for(i=0;i<books.length;i++){
    if(name[i].name.toLowerCase().includes(x.toLowerCase())){
      arr.push(books[i].name);
      full.push(name[i].name);
    }
  }
  if(arr.length!=0)
  res.render('searchresults',{full,arr,err:""});
  else{
    res.render('searchresults',{full,arr,err:"No results"});
  }
})

