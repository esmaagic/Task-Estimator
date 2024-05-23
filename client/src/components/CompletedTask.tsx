
import {
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { formatTime } from '@/utility/formatTime';
import DeleteIcon from '@mui/icons-material/Delete';
import {calculateDifficultyDeviation, calculateTimeDeviation} from '@/utility/calculations'
import axios from 'axios';
axios.defaults.withCredentials = true;

const CompletedTask: React.FC<{ item: any; onUpdate: () => void }> = ({
  item,
  onUpdate,
}) => {
    
   
  
  
    const handleOptionDelete = async () => {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${item._id}`, { withCredentials: true });
        onUpdate()
  
      } catch (error) {
        console.error('Error marking task as complete:', error);
      }
    };

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
      {/* Title */}
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {item.title}
      </Typography>
      <Button  onClick={handleOptionDelete}>
        <DeleteIcon />
        </Button>
      
      </Box>
     

      {/* Estimated and Real Time */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {/* Estimated Time */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Estimated Time: {formatTime(item.estimated_time_min)} 
          </Typography>
        </Box>

        {/* Real Time */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Real Time: {formatTime(item.real_time_min)} 
          </Typography>
        </Box>
      </Box>

      {/* Time Off */}
      <Box sx={{
    display: 'inline-block',
    backgroundColor: 'secondary.main',
    color: 'white',
    borderRadius: 2,
  }}>
        <Typography variant="body1" sx={{ paddingX: 1 }}>
          Off by: {calculateTimeDeviation(item.real_time_min, item.estimated_time_min)}% ( {formatTime(Math.abs(item.real_time_min - item.estimated_time_min))}  )

        </Typography>
      </Box>

      {/* Horizontal Line */}
      <Divider sx={{ my: 2, borderColor: 'grey.300' }} />

      {/* Estimated and Real Difficulty */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {/* Estimated Difficulty */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Estimated Difficulty: {item.estimated_difficulty}
          </Typography>
        </Box>

        {/* Real Difficulty */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Real Difficulty: {item.real_difficulty}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
    display: 'inline-block',
    backgroundColor: calculateDifficultyDeviation(item.estimated_difficulty, item.real_difficulty) <= 20 ? '#00bfa5' : 'secondary.main',
    color: 'white',
    borderRadius: 2,
  }}>
        <Typography variant="body1" sx={{ paddingX: 1, }}>
          Off by: {calculateDifficultyDeviation(item.estimated_difficulty,item.real_difficulty)} %
        </Typography>
      </Box>

      
    </Box>
  );
};

export default CompletedTask;
