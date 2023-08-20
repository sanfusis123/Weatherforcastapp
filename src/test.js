// const apival = ()=>{
//     return fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/delhi/2023-08-20/2023-08-20?unitGroup=us&include=days%2Chours&key=WNNQRQQQM78NL37DXMR2D2XT5&contentType=json',{
//         method: 'GET'
//     }).then(res => res.json())
//       .catch(err => console.log(err))
// }
const fs = require("fs");

// // initializing a JavaScript object

// // converting the JSON object to a string
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


// apival().then(data=> {
    
//      console.log(data)
//      const dataa = JSON.stringify(data);

// writing the JSON string content to a file
fs.readFile("data1.json",'utf8', (error,data) => {
  // throwing the error
  // in case of a writing problem
  if (error) {
    // logging the error
    console.error(error);

    throw error;
  }

  let all = JSON.parse(data);
  let desiredata = all.days[0].hours
  let arr = []
  const time = new Date().getHours()
  for(let i = time - 4 ; i<= time; i++){
    arr.append(preprocessing(desiredata[i]));
  }
  console.log(arr)
});

