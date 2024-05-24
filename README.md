# Visit TaskEstimator [task-estimator-client.vercel.app](task-estimator-client.vercel.app/)
### IMPORTANT: Please use FireFox when accessing the applicatoin.
I am currently facing some issues with session cookies in Chrome and hope to resolve them very soon. 



# Task Management App
Our app empowers users to efficiently manage their tasks by providing a simple and intuitive interface. With just a few clicks, users can create tasks, specifying their title, estimated time, and difficulty level.

## Features
Task Creation: Easily create tasks with a title, estimated time, and difficulty level.\
Real-Time Updates: Update tasks with the actual time spent and difficulty experienced as users progress.\
Accurate Tracking: Ensure accurate tracking of activities with real-time updates.\
Estimation Accuracy: Automatically calculate the accuracy of users' estimations once a task is completed, providing valuable insights into their planning abilities.\
Progress Visualization: Visualize progress over time through interactive charts, gaining deeper insights into productivity patterns.\


## Api
### Installation

1. Navigate to the api directory
2. Run ***npm install*** to install dependencies.
3. Set up the .env file 
    - PORT=5000
    - MONGO_URI=your db connection url
    - SECRET_KEY=your_api_key_here
    - CLIENT_ORIGIN=http://localhost:3000 
4. Run ***npm run dev*** and head over to localhost:5000

## Client
### Installation

1. Navigate to client directory
2. Run ***npm install*** to install dependencies
3. Set up the .env.local file 
    - NEXT_PUBLIC_API_URL=http://localhost:5000
4. Run ***npm run dev*** and head over to localhost:3000

## Usage
- Create a Task: Click on 'Add Task' and fill in the title, estimated time, and difficulty level.
- Update a Task: As you work on a task, update the real-time spent and the difficulty experienced.
- Complete a Task: Mark the task as complete to automatically calculate the estimation accuracy.
- View Progress: Access interactive charts to visualize your progress and gain insights into your productivity patterns.

## Technologies user
1. Node.js
2. Express.js
3. Next.js
4. MongoDB
5. TypeScript
6. JavaScript

## Contributing
We welcome contributions! Please read our Contributing Guidelines for more details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for using our task management app! We hope it helps you in efficiently managing your tasks and improving your productivity.
