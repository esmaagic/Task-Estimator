'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Divider, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface User {
  firstname: string;
  lastname: string;
  email: string;
  // Add any other fields you need from the user object
}

const Account = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);
        setUser(response.data.user);
      } catch (error) {
        //console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push('/');
    } catch (error) {
      //console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>Error: User data not available</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Account Information
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2, marginTop:5 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">First Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">{user.firstname}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 1 }} />
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Last Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">{user.lastname}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 1 }} />
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">{user.email}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Button
          sx={{ backgroundColor: "secondary.main" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default withAuth(Account);
