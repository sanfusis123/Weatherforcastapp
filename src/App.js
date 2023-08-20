import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import * as tf from '@tensorflow/tfjs'; 
import { postprocessing ,  weatherdata , conditions, getNextTime } from './data';
import Table from './component/Table';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { Button, Typography } from '@mui/material';
import Card from './component/Card';
import Footer from './component/Footer';
function App() {
  const [modelcon, setModelcon] = useState(null);
  const [model, setModel] = useState(null);
  const [predictedWeather , setpredictedWeather] = useState([])
  const [current ,setCurrent] = useState([])
  const [crr , setcrr] = useState(null)
  const loadModel = async () => {
    const modelcon = await tf.loadLayersModel("/tfjsconmodel/model.json");
    setModelcon(modelcon);
    const model = await tf.loadLayersModel("/tfjsmodel/model.json");
    setModel(model);
    weatherdata().then(data=>{
      setCurrent(data[0])
      setcrr(data[1])

    })
  };
  useEffect(() => {
    loadModel();

  }, []);
  const pred = (data)=>{
    let prediction = modelcon.predict(tf.tensor(data, [13,1]).expandDims())
    let con = prediction.squeeze().argMax().arraySync()
    return conditions[con]
  }
  const predvalues = (data)=>{
         let prediction = model.predict(tf.tensor(data, [5,13]).expandDims())
         let con = prediction.squeeze().arraySync()
         return con
  }
  const weatherPreds = (data)=>{
    let weadata = [...data];  
    for(let i=0; i<=11; i++){
      let condition = predvalues(weadata.slice(i))
      let dataCondition = condition.concat(getNextTime(i+1))
      let cond = pred(dataCondition)
      weadata.push(dataCondition)
      let actualValues = postprocessing(condition)
      actualValues.condition = cond
      console.log(actualValues)
      setpredictedWeather(prev => [...prev , actualValues])        
    }
     
  }
  
  const buttonpredict = (e)=>{
    e.preventDefault()
     weatherPreds(current)
   
  }
  
  return (
    <div className="App">
        <Typography  variant='h3'  color={'Highlight'} gutterBottom >
          Weather Forcasting Application
        </Typography>
        <Card current = {crr}/>
        <Button variant="outlined" startIcon={<OnlinePredictionIcon />}
         onClick={buttonpredict}>
             Predict Next 12 Hours
        </Button>
        {console.log(current)
        }
        <Typography  variant='h3' gutterBottom= {true} >
          Table Of Next Predicted Hours
        </Typography>
     <Table table = {predictedWeather}/>
      <Footer/>
    </div>
  );
}

export default App;
