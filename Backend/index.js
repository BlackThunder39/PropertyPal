const express = require("express");
const bodyParser = require('body-parser');
const db = require('./mysql_connect');
const dashB = require('./routes/dashb');
const cors = require("cors")


//port number to listen
const port = 5000;

//init
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/dashboard",dashB);
app.use(cors())


//initializing
app.listen(port,()=>{
  console.log("Server Listening.\nAuto Restart Enabled.");
}); 


//home page 
app.get('/', function(req, res){
  res.send("Only accepting GET and POST requests!");
});



//authorisation
app.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let rep = "unknown";
  let acces = "denied";

  if(username &&
    username.toUpperCase().charAt(0) === "E" &&
    password &&
    password.length >= 6){
      rep = "employee";

      // res.send({ user: "employee" });
    }else if (
    username &&
    username.toUpperCase().charAt(0) === "A" &&
    password &&
    password.length >= 6
  ) {
    rep = "admin";
  }else if (
    username &&
    username.toUpperCase().charAt(0) === "T" &&
    password &&
    password.length >= 6
  ) {
    rep = "tenant";
  }else if (
    username &&
    username.toUpperCase().charAt(0) === "O" &&
    password &&
    password.length >= 6
  ) {
    rep= "owner";
  }  else if(password.length < 6) {
    res.send({ user: "passunknown" });
  }else {
    res.send({ user: "unknown" });
  }

  const resul =db.authoriseuser(username,password,(err,result)=>{
    if(err) console.log(err);
    acces = result;
    console.log(acces);
    res.send({
      access: acces,
      user: rep,
    });
  })
});


//register complaint
app.post('/raisingcomplaint',function(req,res){
    const desc = req.body.descp;
    const blockno = req.body.blockno;
    const roomno = req.body.roomno;
    const values = [desc,blockno,roomno];
    const resul =db.registercomplaint(values,(err,result)=>{
      if(err) console.log(err);
    res.send(result);
    })
});

//create a new tenant by owner
app.post('/createtenant',function(req,res)
{
  const name = req.body.name;
  const age = req.body.age;
  const tenantno = req.body.tenantno;  
  const adhaar = req.body.adhaar;
  const roomno = req.body.roomno;
  const password = req.body.password;
  const dob = req.body.dob;
  const values = [tenantno,name,dob,roomno,age];
  const prof = [adhaar,tenantno];
  const vals = ["t-"+tenantno,password,tenantno];

  const rest =db.createtenant(values,(err,result)=>{
    if(err) console.log(err);
  });
  const rep =db.createtenantproof(prof,(err,result)=>{
    if(err) console.log(err);//res.sendStatus(404);
  });
  const respn =db.createuserid(vals,(err,result)=>{
    if(err) console.log(err);//res.sendStatus(404);
    else res.sendStatus(200);
  })
});

//creates employee by admin
app.post('/createemployee',(req,res)=>{
  const empid = req.body.employeeId;
  const name = req.body.name;
  const salary = req.body.salary;
  const emptype = req.body.empTy;
  const age = req.body.age;
  const blockno = req.body.blockno;
  const password = req.body.password;
  const values = [empid,name,salary,emptype,age,blockno];
  const vals = ["e-"+empid,password,empid];
  const rest = db.createemployee(values,(err,result)=>{
    if(err) console.log(err);//res.sendStatus(404);
  });

  const respn =db.createuserid(vals,(err,result)=>{
    if(err) console.log(err);//res.sendStatus(404);
    else res.sendStatus(200);
  });
});

app.post('/createroom',(req,res)=>{
  const room_number = req.body.roomNumber;
  const type = req.body.type;
  const floor = req.body.floor;
  const blockno = req.body.blockno;
  const values = [room_number,type,floor,blockno];
  const rest = db.createroom(values,(err,result)=>{
    if(err) console.log(err);//res.sendStatus(404);
  });
});



//creates owner in owner table
app.post('/createowner',(req,res)=>
{
  const ownerid = req.body.ownerId;
    const name = req.body.name;
    const age = req.body.age;
    const aggrement_status = req.body.aggrementStatus;
    const roomno = req.body.roomno;
    const dob = req.body.dob;
    const proof = req.body.adhaar;
    const values = [ownerid,name,age,aggrement_status,roomno,dob];
    const proofval = [proof,ownerid];
    const password = req.body.password;
    const vals = ["o-"+ownerid,password,ownerid];

    const rest = db.createowner(values,(err,result)=>{
      if(err) console.log(err);//res.sendStatus(404);
  });
  const rep = db.createownerproof(proofval,(err,result)=>{
    console.log(proofval);
    if(err) console.log(err);//res.sendStatus(404);
});
const respn =db.createuserid(vals,(err,result)=>{
  if(err) console.log(err);//res.sendStatus(404);
  else res.sendStatus(200);
})
});


//get the tenent details fetch all data from table
app.get('/tenantdetails',(req,res)=>
{
    const rest = db.getdata('tenant',(err,result)=>
    {
      res.send(result);
    })
})



//get the owner details fetch all the data from the table
app.get('/ownerdetails',(req,res)=>
{
    const rest = db.getdata('owner',(err,result)=>
    {
      res.send(result);
    })
})

//get the employee details fetch all the data from the table
app.get('/employeedetails',(req,res)=>
{
    const rest = db.getdata('employee',(err,result)=>
    {
      res.send(result);
    })
})


//view parkings owned by tenant
app.post('/viewparking',(req,res)=>
{
  const id = req.body.userId;
  const rest = db.viewparking(id,(err,result)=>
  {
    if(err) console.log(err);
    res.send(result);
  })
})



//get the room details owned by the owner
app.post('/ownercomplaints',(req,res)=>
{
  const ownerid = req.body.userId;
    const rest = db.ownercomplaints(ownerid,(err,result)=>
    {
      if(err) console.log(err);
      res.send(result);
    })
})


//view complaints that are in the database
app.get('/viewcomplaints',(req,res)=>
{
    const rest = db.viewcomplaints((err,result)=>
    {
      res.send(result);
    })
})


//getonlycomplaints according to owner
app.post('/ownerroomdetails',(req,res)=>
{
    const ownerId = req.body.userId;
    const rest = db.ownerroomdetails(ownerId,(err,result)=>
    {
      if(err) console.log(err);
      res.send(result);
    })
})




//books parking slot for tenents
app.post('/bookslot',(req,res)=>
{
    const roomno =req.body.roomNo;
    const slno = req.body.slotNo;
    const values = [slno,roomno,];
    const rest = db.bookslot(values,(err,result)=>{
      if(err) console.log(err);
      if(err) res.sendStatus(405);
      else{
        res.sendStatus(200);
      }
      
  })
});


app.post('/ownertenantdetails',(req,res)=>
{
    const id = req.body.userId;
    const rest = db.ownertenantdetails(id,(err,result)=>{
      if(err) console.log(err);
      if(err) res.sendStatus(405);
      else{
        res.send(result);
      }
  })
});

app.post('/paymaintanance',(req,res)=>
{
    const id = req.body.userId;
    const rest = db.paymaintanence(id,(err,result)=>{
      if(err) console.log(err);
      if(err) res.sendStatus(405);
      else{
        res.sendStatus(200);
      }
  })
});
//Other routes
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});