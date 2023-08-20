import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function MediaControlCard(props) {
  const theme = useTheme();
  const current = props.current;
  console.log(current)
  return (
     <Card sx={{ display: 'flex' , flexDirection: 'row' , height: 400 , marginBottom: 10
     }}>
        {current &&
        <>
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' , minWidth: 420}}>
          <Typography component="div" variant="h2" gutterBottom>
              Delhi, India 
          </Typography>
          <Typography variant="h5"  component="div">
            Condition: {current.conditions}
            <AcUnitIcon/> 
             
            </Typography>
       
            <br/>
             <Typography variant="h5"  component="div" gutterBottom>
          
            Tempurature :{current.temp}
            <ThermostatIcon/> 
          </Typography>
          <Typography  variant="subtitle" gutterBottom>
              Pressure : {current.pressure}
          </Typography>
          <br/>
          <Typography  variant="subtitle" gutterBottom>
              Humidity : {current.humidity}
          </Typography>
          <br/>
          <Typography variant="subtitle" gutterBottom>
              FeelsLike : {current.feelslike}
          </Typography>
          <br/>
          <Typography  variant="subtitle" gutterBottom>
              UV :  {current.uvindex}
          </Typography>
          <br/>
          <Typography  variant="subtitle" gutterBottom>
              Dew :  {current.dew}
          </Typography>
          


        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        
        <Typography variant='h5'>
            
        {current.visibility}
        <IconButton aria-label="play/pause">
            <VisibilityIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          </Typography>
       
          <Typography variant='h5'>
          {current.cloudcover}
         
          <IconButton aria-label="previous">
          <WbCloudyIcon sx={{ height: 38, width: 38 }}/>
          </IconButton>
          </Typography>
       
          <Typography variant='h5'>
          {current.windspeed} K/h
         
          <IconButton aria-label="next">
         <AirIcon sx={{ height: 38, width: 38 }}/>
          </IconButton>
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ height: 500}}
        image="https://img.freepik.com/free-vector/weather-concept-illustration_114360-1234.jpg?w=740&t=st=1692530608~exp=1692531208~hmac=2db9ec884cd4e161616eee105bccb4090e85f2374c6c3a4793340f4ce7c2da8e"
        alt="Live from space album cover"
      />
       </> }
    </Card>
  
  );
}
