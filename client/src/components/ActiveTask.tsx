'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem as MuiMenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useForm, Controller } from 'react-hook-form';
import { formatTime } from '@/utility/formatTime';
import axios from 'axios';
axios.defaults.withCredentials = true;

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

interface ActiveTaskProps {
  item: Task;
  onUpdate: () => Promise<void>;
}

const ActiveTask: React.FC<ActiveTaskProps> = ({ item, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const { handleSubmit, control, formState: { errors } } = useForm()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleOptionComplete = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/complete/${item._id}`, { withCredentials: true });
      onUpdate()

    } catch (error) {
      console.error('Error marking task as complete:', error);
    }

    handleClose();
  };

  const handleOptionEdit = () => {
    setIsDialogOpen(true);
    handleClose();
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const onSubmit = async (data: any) => {
    const { newTime, newDifficulty } = data
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/edit/realTime/${item._id}`, { newTime })
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/edit/realDifficulty/${item._id}`, { newDifficulty })
    onUpdate()
    handleCloseDialog();
  };

  const handleOptionDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${item._id}`, { withCredentials: true });
      onUpdate()

    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
    handleClose();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{item.title}</Typography>
        <Button
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOptionComplete}>Mark as done</MenuItem>
          <MenuItem onClick={handleOptionEdit}>Edit</MenuItem>
          <MenuItem onClick={handleOptionDelete}>Delete</MenuItem>

        </Menu>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box >
                <Controller
                  name="newDifficulty"
                  control={control}
                  defaultValue={item.real_difficulty}
                  render={({ field }) => (



                    <TextField
                      {...field}
                      fullWidth
                      margin='normal'
                      label="Real difficulty"
                      id="real-difficulty"
                      select
                      error={!!errors.real_difficulty}
                    >
                      <MuiMenuItem value="very easy">Very Easy</MuiMenuItem>
                      <MuiMenuItem value="easy">Easy</MuiMenuItem>
                      <MuiMenuItem value="medium">Medium</MuiMenuItem>
                      <MuiMenuItem value="hard">Hard</MuiMenuItem>
                      <MuiMenuItem value="very hard">Very hard</MuiMenuItem>
                    </TextField>

                  )}
                />
                <Controller
                  name="newTime"
                  control={control}
                  defaultValue={item.real_time_min}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Real Time (min)"
                      type="number"
                      fullWidth
                      margin='normal'
                      error={!!errors.real_time_min}
                      helperText={errors.real_time_min && "Time should be a number 0 or greater"}
                    />
                  )}
                />
              </Box>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                <Button type="submit" color="primary">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
      {/* Data Rows */}
      <Box>
        <Typography variant="body1" sx={{ mb: 1 }}>Estimated</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Time spent:
          <Typography component="span" fontWeight="bold">{formatTime(item.estimated_time_min)}</Typography>
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Difficulty:  
          <Typography component="span" fontWeight="bold"> {item.estimated_difficulty}</Typography>
        </Typography>
        <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>Real</Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Time spent:
          <Typography component="span" fontWeight="bold">  {formatTime(item.real_time_min)}</Typography>
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Difficulty: 
          <Typography component="span" fontWeight="bold">  {item.real_difficulty}</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ActiveTask
