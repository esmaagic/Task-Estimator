"use client"
import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Breadcrumbs
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsightsIcon from '@mui/icons-material/Insights';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
axios.defaults.withCredentials = true;



function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function Header() {

  const pathname = usePathname()
  const canRender = pathname !== '/login' && pathname !== '/' && pathname !== '/register' ? true : false

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
        setUser(userData);
      } catch (error) {
      }
    };

    fetchUser();
  }, [pathname]);


  const currentPath = usePathname()

  const getLinkStyle = (path: string) => {
    return currentPath === path ? { fontWeight: 'bold' } : {};
  };






  return (
    <>
      {canRender &&
        [
          <AppBar key="AppBar" position="static" >
            <Container maxWidth="xl"   >
              <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InsightsIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                      mr: 2,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    TaskEstimator
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link href="/account"><AccountCircleIcon sx={{ fontSize: 45, color: 'white' }} /></Link>


                </Box>
              </Toolbar>
            </Container>
          </AppBar>,
          
          <div
          key="account"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold',
          }}
          role="presentation"
          onClick={handleClick}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/home" style={getLinkStyle('/home')}>
              Active
            </Link>
            <Link color="inherit" href="/completed" style={getLinkStyle('/completed')}>
              Completed
            </Link>
            <Link color="text.primary" href="/insight" aria-current="page" style={getLinkStyle('/insight')}>
              Insight
            </Link>
          </Breadcrumbs>
        </div>
        ]
      }
    </>


  );
}
