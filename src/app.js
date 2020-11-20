const path = require('path')
const express = require('express');
const { title } = require('process');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const openweather = require('./utils/openweather.js');


const app = express()
const port = process.env.PORT ||3000


console.log(__dirname);

//define path for express config
const public=path.join(__dirname,`../public`);

//define path for views
const viewsPath=path.join(__dirname,`../templates/views`);

//define path for partials
const partialPath=path.join(__dirname,`../templates/partials`);

//setting up path for partials in hbs
hbs.registerPartials(partialPath);

//setting view enging to hbs
app.set('view engine', 'hbs');
app.set('views',viewsPath);

//setup static directory to serve
app.use(express.static(public));



app.get('',(req,res)=>{
  res.render('index',
  {
    title:'Weather',
    name:'Ali Hasnain'
  });
  
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about',
    name:'Ali Hasnain'
  });
  
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'help',
    name:'Ali Hasnain'
});
})

app.get('/product', (req, res) => {
  if(req.query.search){  
  res.send(
      {
          product:[]
          
      }
  )  }
    else{
      res.send({error:'empty Query string'})

    }
})


app.get('/weather',(req,res)=>{

if(!req.query.address){
  res.send({error:'empty Query string'});

}
else{
  const address = req.query.address;
  geocode(address,(error,{latitude, longitude, location}={})=>{

    if(error)
    {
       return res.send({error});
    }
    
    else
    {
    openweather(latitude,longitude,(error,{temp, weather}={})=>{
        if(error)
        {
          return res.send({error});

        }
        else{
            res.send({

            Temperature: temp,
            Weather : weather,
            address : location
          });
        }
      
      //  console.log(location);
      //  console.log(`It is currenlty ${temp} degrees out. The weather is basically ${weather}`);
    });
  }

});



}







})



app.get('*',(req,res)=>{

  res.render('404',{title:'404',name:'Ali'});
})


// app.get('', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     res.send(`<h1 align:'center'>Hello from about!</h1>`)
//   })
  
//   app.get('', (req, res) => {
//     res.send()
//   })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})