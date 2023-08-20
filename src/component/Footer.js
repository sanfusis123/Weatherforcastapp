
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary">
      {'Copyright © '}
      <Link  href="https://github.com/sanfusis123">
        SAN.ME
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {

  return (
     <>
        <Container maxWidth="sm">
          <Typography variant="body1">Weather  Forcast Application</Typography>
          <Typography variant="body1">For the entire project sournce code check my Github account</Typography>
         
          <Copyright />
        </Container>
      </>
  );
}