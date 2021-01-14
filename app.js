var express = require('express');
var path = require('path');
var fs = require('fs'); 
var app = express();
var session=require('express-session');



var flag1=false;
var flag=true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret-key', resave:false, saveUninitialized:true}))


app.get('/', function(req, res){
  res.render("login",{error:""});
  //flag1=false;
  
})

//Login part
app.post('/', function(req, res){
  var x = req.body.username;
  var y = req.body.password;
  var flag1= false;
  if(x!='' && y!=''){
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==x && d[i]["pass"]==y){
      flag1=true;
    }
  }
  if(flag1==true){
    req.session.user=x
    req.session.save()
    res.redirect('/home');
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
    var newuser = {name:n, pass:m,list:[]};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq.push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
    req.session.user=n
    req.session.save()
    res.redirect('/home');
    }
    else{
      res.render('registration',{error:"Username is already used"});
    }
  }
    else{
      res.render('registration',{error:"Please fill in the required fields"});
    }
  })


app.get('/novel', function(req, res){
  res.render('novel');
})

app.get('/flies', function(req, res){
  res.render('flies',{error:""});
})

app.post('/addflies', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "flies")
        flag2=false;
      }
      if(flag2==true){
    var book="flies"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("flies",{error:"Already added in your list"});
    }
    }

}

})

app.get('/grapes', function(req, res){
  res.render('grapes',{error:""});
})

app.post('/addgrapes', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "grapes")
        flag2=false;
      }
      if(flag2==true){
    var book="grapes"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("grapes",{error:"Already added in your list"});
    }
    }

}

})

app.get('/poetry', function(req, res){
  res.render('poetry',{error:""});
})

app.get('/leaves', function(req, res){
  res.render('leaves',{error:""});
})

app.post('/addleaves', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "leaves")
        flag2=false;
      }
      if(flag2==true){
    var book="leaves"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("leaves",{error:"Already added in your list"});
    }
    }

}

})

app.get('/sun', function(req, res){
  res.render('sun',{error:""});
})

app.post('/addsun', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "sun")
        flag2=false;
      }
      if(flag2==true){
    var book="sun"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("sun",{error:"Already added in your list"});
    }
    }

}

})

app.get('/fiction', function(req, res){
  res.render('fiction',{error:""});
})

app.get('/dune', function(req, res){
  res.render('dune',{error:""});
})

app.post('/adddune', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "dune")
        flag2=false;
      }
      if(flag2==true){
    var book="dune"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("dune",{error:"Already added in your list"});
    }
    }

}

})

app.get('/mockingbird', function(req, res){
  res.render('mockingbird',{error:""});
})

app.post('/addmockingbird', function(req, res){
  var s=req.session.user;
  var d = JSON.parse(fs.readFileSync("Database.json"));
  var l = JSON.parse(fs.readFileSync("Database.json")).length;
  var i;
  for(i=0;i<l;i++){
    if(d[i]["name"]==s){
      var j;
      var l2=d[i]["list"].length;
      flag2=true;
      for(j=0;j<l2;j++){
        if(d[i]["list"][j]["book"]== "mockingbird")
        flag2=false;
      }
      if(flag2==true){
    var book="mockingbird"
        var newuser = {book};
    var ob= fs.readFileSync("Database.json");
    var obq = JSON.parse(ob);
    obq[i]["list"].push(newuser);
    var data = JSON.stringify(obq);
    fs.writeFileSync("Database.json",data);
      }
      else{
        res.render("mockingbird",{error:"Already added in your list"});
    }
    }

}

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

app.get('/readlist', function(req, res){
  var e=req.session.user;
  var arr1=[];
  var arr2=[];
  var l= JSON.parse(fs.readFileSync("Database.json")).length;
    var D = JSON.parse(fs.readFileSync("Database.json"));
    var i;
for (i = 0; i < l; i++) {
  if(D[i]["name"]==e){
    var j;
    var l2=D[i]["list"].length;
    var m;
    for(j=0;j<l2;j++){
     m=D[i]["list"][j]["book"];
     if(m=="flies"){
     arr1.push("Lord of the Flies")
     arr2.push("flies")
     }
     if(m=="grapes"){
     arr1.push("The Grapes of Wrath")
     arr2.push("grapes")
     }
     if(m=="leaves"){
     arr1.push("Leaves of Grass")
     arr2.push("leaves") 
    }
     if(m=="sun"){
     arr1.push("The Sun and Her Flowers")
     arr2.push("sun") 
    }
     if(m=="dune"){
     arr1.push("Dune")
     arr2.push("dune") 
    }
     if(m=="mockingbird"){
     arr1.push("To Kill a Mockingbird")
     arr2.push("mockingbird") 
    }
    }
  }
}
if(arr1.length!=0)
  res.render('readlist',{arr1,arr2,err:""});
  else{
    res.render('readlist',{arr1,arr2,err:"No results"});
  }


})


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});