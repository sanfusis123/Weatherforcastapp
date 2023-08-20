const todaydate = new Date().toJSON().slice(0,10)
const key = 'QK4GJV2RSVEHHPVY84PCPMKSR'



const apival = ()=>{
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/delhi/${todaydate}/${todaydate}?unitGroup=us&include=days%2Chours&key=${key}&contentType=json`,{
        method: 'GET'
    }).then(res => res.json())
      .catch(err => console.log(err))
}

const weatherdata = async()=>{
    let arr = []
    let crr;  
    await apival().then(data =>{
         let all = data.days[0].hours
         const time = new Date().getHours()
         crr = all[time]
         for(let j = time - 4 ; j<= time; j++){
         let tempdata = all[j] 
         let weatherdata = {}  
         let field = ["temp",	"feelslike",	"dew",	"humidity",	"windspeed",	"pressure",	"cloudcover",	"visibility",	"uvindex"]
         for(let i in field){
              weatherdata[field[i]] = tempdata[field[i]]
         }
           let day = 60*60*24
           let year = 365.2425*day

           weatherdata['Day sin'] = Math.sin(tempdata['datetimeEpoch'] * (2* Math.PI /day))
           weatherdata['Day cos'] = Math.cos(tempdata['datetimeEpoch'] * (2* Math.PI /day))
           weatherdata['Year sin'] = Math.sin(tempdata['datetimeEpoch'] * (2* Math.PI /year))
           weatherdata['Year cos'] = Math.cos(tempdata['datetimeEpoch'] * (2* Math.PI /year))

            
         weatherdata = preprocessing(weatherdata)
         arr.push(Object.values(weatherdata))
         }
         
        })
    return [arr ,crr]  

}

const meanstd = {
temp	:{
    mean:76.908799,
    std:	14.835940
},
feelslike:	{
    mean :80.194582,
    std : 	18.486146	
},
dew:	{
    mean:	61.614966,
    std:	12.517404
},
humidity:{ mean:	64.918320,
    std:	23.434075	
},
windspeed:{
    mean:	4.454292,
    std:	3.417571
},
pressure:{
    mean: 1008.933108,
    std:	6.984715
},
cloudcover:{ mean:	35.728877,
    std:	32.792251	
},
visibility:{	mean:	1.681653	,
    std :1.044990
},
    
// uvindex: { mean:	2.184678,
//     std:	2.994081
// }
}

const preprocessing = (data)=>{
    let newData = {}
    Object.entries(data).forEach(entry => {
        const [key, value] = entry;
          if(key == 'uvindex'){
            newData[key] = value/ 10
          }
          else if(["Day sin",	"Day cos",	"Year sin",	"Year cos"].includes(key)){
            newData[key] = value
          }
          else{
             newData[key] = (value - meanstd[key]['mean'])/meanstd[key]['std']
      
          }
      });

    return newData  
}


const postprocessing = (dataarr)=>{
     let objdata = {}
     let field = ["temp",	"feelslike",	"dew",	"humidity",	"windspeed",	"pressure",	"cloudcover",	"visibility",	"uvindex"]         
     for(let i in field){
        objdata[field[i]] = dataarr[i]
     }      
     
    let newData = {}
    Object.entries(objdata).forEach(entry => {
        const [key, value] = entry;
          if(key == 'uvindex'){
            newData[key] = value * 10
          }else{
             newData[key] = (value * meanstd[key]['std']) +  meanstd[key]['mean']
           }
      });
    return newData

}


const conditions = ['Partially cloudy',
'Overcast',
'Rain, Overcast',
'Rain, Partially cloudy',
'Clear',
'Rain',
'Rain, Fog']

// let order = ["temp",	"feelslike",	"dew",	"humidity",	"windspeed",	"sealevelpressure",	"cloudcover",	"visibility",	"uvindex", "Day sin",	"Day cos",	"Year sin",	"Year cos"]


const getNextTime = (hours)=>{
    const time = Date.now() + (hours * 60 * 60)
    let day = 60*60*24
    let year = 365.2425*day
    let arr = []
    arr[0] = Math.sin(time * (2* Math.PI /day))
    arr[1] = Math.cos(time * (2* Math.PI /day))
    arr[2] = Math.sin(time * (2* Math.PI /year))
    arr[3] = Math.cos(time * (2* Math.PI /year))
    return arr
            
}







 export {weatherdata , postprocessing , conditions,  getNextTime}
