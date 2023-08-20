import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function BasicTable(props) {
  const rows = props.table;
  const msg = ()=>{
    console.log(rows)
    if(!rows.length){
    return (<Typography variant='h5' color={'red'} component='div'>
         Please Click to the Predication Button for the Next hours Data
      </Typography>)
   }  
  }
  return (
    <TableContainer component={Paper}>
    {msg()}
       
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
         
        <TableHead>
          <TableRow>
            <TableCell>Hours</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="right">Tempurature</TableCell>
            <TableCell align="right">Feelslike</TableCell>
            <TableCell align="right">Dew</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">WindSpeed</TableCell>
            <TableCell align="right">Pressure</TableCell>
            <TableCell align="right">Cloudcover</TableCell>
            <TableCell align="right">Visibility</TableCell>
            <TableCell align="right">UV index</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {(new Date().getHours() + i+1)%24}
              </TableCell>
              <TableCell align="right">{row.condition}</TableCell>
             
              <TableCell align="right">{row.temp.toFixed(2)}</TableCell>
              <TableCell align="right">{row.feelslike.toFixed(2)}</TableCell>
              <TableCell align="right">{row.dew.toFixed(2)}</TableCell>
              <TableCell align="right">{row.humidity.toFixed(2)}</TableCell>
            
              <TableCell align="right">{row.windspeed.toFixed(2)}</TableCell>
              <TableCell align="right">{row.pressure.toFixed(2)}</TableCell>
              <TableCell align="right">{row.cloudcover.toFixed(2)}</TableCell>
              <TableCell align="right">{row.visibility.toFixed(2)}</TableCell>
              
              <TableCell align="right">{Math.round(row.uvindex) < 0 ? 0 : Math.round(row.uvindex) }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
