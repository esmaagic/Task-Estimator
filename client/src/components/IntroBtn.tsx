import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useState } from 'react';

const IntroBtn: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Button sx={{marginTop:1}} onClick={handleOpen}>Quick introduction</Button>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Welcome to TaskEstimator</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Our app empowers users to efficiently manage their tasks by providing a simple and intuitive interface.
          With just a few clicks, users can create tasks, specifying their title, estimated time, and difficulty level.
          As users progress, they can update the task with the real-time spent and difficulty experienced, ensuring
          accurate tracking of their activities.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Once a task is completed, our app automatically calculates the accuracy of the user's estimation, providing
          valuable insights into their planning abilities. Moreover, users can visualize their progress over time
          through interactive charts, gaining deeper insights into their productivity patterns.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default IntroBtn;
