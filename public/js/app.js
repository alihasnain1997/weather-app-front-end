
const weatherInfor=(loc,message)=>{

fetch(`/weather?address=${loc}`).then((response)=>{

response.json().then((data)=>
{
    if(data.error)
    {
        console.log(data.error);
        message.textContent=data.error;
    }
    else{
        console.log(data);
        message.textContent=`temperature : ${data.Temperature}
        Weather : ${data.Weather}`;
    }
})
})
}

const weatherForm=document.querySelector('form');
const address = document.querySelector('input');
const message1 = document.querySelector('#p1');
//const message1 = document.querySelector('#paragraph2');

weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const location = address.value;
   
    weatherInfor(location,message1);
})