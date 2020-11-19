
const request = require('request');

const openweather =(lat,long,callback)=>{

    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=77f254ba41fa7cccc535ba5149bd7fb0`;
    
    //console.log(lat+"   "+long+"   "+Url);
    request({ url , json:true},(error,{body})=>{
        if(error)
        {
            callback("Can't connect to server! check your connection",undefined);
    
    
        }
        else if(body.message)
        {
            callback("unable to find data on the loacation",undefined);
    
        }
         else{
            const temp = body.main.temp;
            const weather = body.weather[0].main;
            callback(undefined,{
                temp:temp,
                weather: weather,
            });
        }
        
    })
}
module.exports = openweather;