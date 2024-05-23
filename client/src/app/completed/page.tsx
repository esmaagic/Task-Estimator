'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '@/components/withAuth';
import CompletedTask from '@/components/CompletedTask';
import { Box, Typography } from '@mui/material';

interface Task {

  _id: number;
  title: string;
  estimated_difficulty: string;
  estimated_time_min:number
  real_time_min: number;
  real_difficulty: string;
  user_id: number;
  completed: boolean;
  
}

const CompletedTasks: React.FC = () => {
 
  const [data, setData] = useState<Task[]>([]);
  const fetchData = async () => {
    try {
      const response: Task[] = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/completed`, { withCredentials: true } );
      const result: Task[] =  response.data;
      setData(result);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


    
  

  useEffect(() => {
    

    fetchData();
  }, []);


  return (
    <div>
    {data.length===0 && 
    <Box
    sx={{
      p: 2,
      marginY: 3,
      maxWidth: 600,
      marginX: 'auto',
      boxShadow: 3,
      borderRadius: 2,
      bgcolor: 'background.paper',
    }}
    >
      <Typography variant="h6" gutterBottom>
        Looks like you have no completed tasks
      </Typography>
      <Typography variant="body1" gutterBottom>
        Go to active tasks and mark a task as complted.
      </Typography>
      
    </Box>
    }  
    {data.map((item) => (
      <CompletedTask key={item._id} item={item} onUpdate={fetchData} />
    ))}
  </div>
  );
};

export default withAuth(CompletedTasks);
