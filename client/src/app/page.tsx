"use client"
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import withNoAuth from '@/components/withNoAuth';
import IntroBtn from '@/components/IntroBtn';


const Home = ()=> {
  return (
  
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        p: 3,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to TaskEstimator
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Please sign in or sign up to continue
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link href="/login" passHref>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Sign In
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="outlined" color="primary">
            Sign Up
          </Button>
        </Link>
        
      </Box>
     <IntroBtn/>
    </Box>
     
  );
}

export default withNoAuth(Home);
