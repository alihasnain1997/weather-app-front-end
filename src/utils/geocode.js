
const request = require('request');

const geocode =(address,callback)=>{

    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxpaGFzbmFpbiIsImEiOiJja2d2dTB6OWYwMmZvMnRxdnZncWhuNzlrIn0.Z7DrnKh-D92oBrliaCjT4Q&limit=1`;
    
    request({ url , json:true},(error,{body})=>{
        if(error)
        {
            callback("Can't connect to server! check your connection",undefined);
    
    
        }
        else if(!body.features && body.features==[])
        {
            callback("unable to find data on the loacation",undefined);
    
        }
        else if(body.features[0]===undefined)
        {
            callback("unable to find data on the loacation",undefined);
        }
         else{
             //console.log(body.features);
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location =  body.features[0].place_name;
            callback(undefined,{
                longitude:longitude,
                latitude: latitude,
                location: location
            });
        }
        
    })
}
module.exports = geocode;