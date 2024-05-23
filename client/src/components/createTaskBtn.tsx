import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography, Select, MenuItem, makeStyles } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router';
axios.defaults.withCredentials = true;

interface IFormInput {
  title: string;
  estimated_time_min: number;
  estimated_difficulty: string;
}

const CreateTaskButton: React.FC = ({ onUpdate }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [loginError, setLoginError] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks/create`,
        { data },
        { withCredentials: true }
      );
      onUpdate()
      handleClose()

    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: "secondary.main", position: 'fixed', bottom: 20, right: 20 }}>
        Create Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Task</DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            Real time and real difficulty will be set to default values.
            Please change before completing task!
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          

         
            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Estimated Time (min)"
              {...register('estimated_time_min', { required: 'Estimated time is required', min: 1 })}
              error={!!errors.estimated_time_min}
              helperText={errors.estimated_time_min ? errors.estimated_time_min.message : ''}
            />

            <TextField
              fullWidth
              select
              margin='normal'
              defaultValue={"medium"}
              label="Estimated Difficulty"
              {...register('estimated_difficulty', { required: 'Estimated difficulty is required' })}
              error={!!errors.estimated_difficulty}
            >
              <MenuItem value="very easy">Very easy</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
              <MenuItem value="very hard">Very Hard</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTaskButton;
