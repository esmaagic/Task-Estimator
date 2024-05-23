'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '@/components/withAuth';
axios.defaults.withCredentials = true;
import {
    dataTime,
    dataDifficulty,
    xAxis,
    dataEstimatedDifficulty,
    dataRealDifficulty,
    dataEstimatedTime,
    dataRealTime
} from '@/utility/calculations'
import { LineChart } from '@mui/x-charts/LineChart';
import { Box ,useMediaQuery, useTheme} from '@mui/material'
import { Typography } from '@mui/material';



interface Task {

    _id: number;
    title: string;
    estimated_difficulty: string;
    estimated_time_min: number
    real_time_min: number;
    real_difficulty: string;
    user_id: number;
    completed: boolean;

}

const Insight = () => {

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const [data, setData] = useState<Task[]>([]);
    const fetchData = async () => {
        try {
            const response: Task[] = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/completed`, { withCredentials: true });
            const result: Task[] = response.data;
            setData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const timeData = dataTime(data)
    const difficultyData = dataDifficulty(data)
    const firstN = xAxis(data.length)
    const estTimeData = dataEstimatedTime(data)
    const realTimeData = dataRealTime(data)
    const estDifficultyData = dataEstimatedDifficulty(data)
    const realDifficultyData = dataRealDifficulty(data)
    return (
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
      <Typography margin={2} variant="body2" color="textSecondary">
        Percentage by which user was off in estimation:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <LineChart
          xAxis={[{ label: 'Tasks', data: firstN }]}
          yAxis={[{ label: 'Off by %' }]}
          series={[
            {
              color: 'orange',
              label: 'Time estimation',
              data: timeData,
            },
          ]}
          width={isXs ? 300 : 500}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <LineChart
          xAxis={[{ label: 'Tasks', data: firstN }]}
          yAxis={[{ label: 'Off by %' }]}
          series={[
            {
              color: 'blue',
              label: 'Difficulty estimation',
              data: difficultyData,
            },
          ]}
          width={isXs ? 300 : 500}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>

      <Typography margin={2} variant="body2" color="textSecondary">
        Estimated value vs real value:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <LineChart
          xAxis={[{ label: 'Tasks', data: firstN }]}
          yAxis={[{ label: 'Time (min)' }]}
          series={[
            {
              color: 'green',
              label: 'Estimated time (min)',
              data: estTimeData,
            },
            {
              color: 'red',
              label: 'Real time (min)',
              data: realTimeData,
            },
          ]}
          width={isXs ? 300 : 500}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <LineChart
          xAxis={[{ label: 'Tasks', data: firstN }]}
          yAxis={[{ label: 'Difficulty' }]}
          series={[
            {
              color: 'yellow',
              label: 'Estimated difficulty',
              data: estDifficultyData,
            },
            {
              color: 'purple',
              label: 'Real difficulty',
              data: realDifficultyData,
            },
          ]}
          width={isXs ? 300 : 500}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>
    </Box>
    )
}

export default withAuth(Insight)