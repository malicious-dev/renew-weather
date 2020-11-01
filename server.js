const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function (req, res){
  res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req, res){
  const country = req.body.cityname;
  const apikey = "{YOUR API KEY}";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid="+apikey+"&units="+units;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const weatherdescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
      res.write("<h1>the temperature in "+country+" is "+temp+"</h1>");
      res.write("<h1>the weather description in "+ country +" is " +weatherdescription+"</h1>")
      res.write("<img src="+imageurl+">");
      res.send();
    })
  })
})



app.listen(process.env.PORT || 3000, function(req, res){
  console.log("server is running on port 3000");
})
