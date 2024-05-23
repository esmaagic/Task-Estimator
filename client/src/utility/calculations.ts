interface DifficultyWeights {
    [difficulty: string]: number;
  }
  const difficultyPercentages: { [key: string]: number } = {
    'very easy': 20,
    'easy': 40,
    'medium': 60,
    'hard': 80,
    'very hard': 100
  };
  export function calculateDifficultyDeviation(estimatedDifficulty: string, actualDifficulty: string): number {
    // Map each difficulty level to its corresponding percentage
    
  
    // Get the percentage for the estimated and actual difficulty
    const estPercentage = difficultyPercentages[estimatedDifficulty.toLowerCase()];
    const actPercentage = difficultyPercentages[actualDifficulty.toLowerCase()];
  
    // Calculate the difference in percentage
    const percentageDifference = Math.abs(estPercentage - actPercentage);
  
    // Round up to the nearest whole number
    const roundedPercentageDifference = Math.ceil(percentageDifference);
  
    return roundedPercentageDifference;
  }
  
  
 
  export function calculateTimeDeviation(estimatedTime: number, actualTime: number): number {
    // Ensure both times are positive
    const estTime = Math.max(0, estimatedTime);
    const actTime = Math.max(0, actualTime);
    
    // Calculate the difference in time
    const timeDifference = Math.abs(estTime - actTime);
    
    // Calculate the percentage difference
    const percentageDifference = (timeDifference / estTime) * 100;
    
    // Round up to the nearest whole number
    const roundedPercentageDifference = Math.ceil(percentageDifference);
    
    return roundedPercentageDifference;
  }
  

export function dataTime  (tasks: any): number[] {
    const percentageOffArray: number[] = [];
    tasks.forEach((task:any) => {
      const percentageOff = calculateTimeDeviation(task.estimated_time_min,task.real_time_min);
      percentageOffArray.push(percentageOff);
    });
  
    return percentageOffArray;
  };

 export function dataDifficulty (tasks: any): number[]  {
    const percentageOffArray: number[] = [];
    tasks.forEach((task:any) => {
      const percentageOff = calculateDifficultyDeviation(task.estimated_difficulty,task.real_difficulty);
      percentageOffArray.push(percentageOff);
    });
  
    return percentageOffArray;
  };

  export function dataEstimatedTime (tasks: any): number[]  {
    const estimatedTimeOffArray: number[] = [];
    tasks.forEach((task:any) => {
      estimatedTimeOffArray.push(task.estimated_time_min);
    });
  
    return estimatedTimeOffArray;
  };

  export function dataEstimatedDifficulty (tasks: any): number[]  {
    const estimatedDifficultyOffArray: number[] = [];
    tasks.forEach((task:any) => {
        estimatedDifficultyOffArray.push(difficultyPercentages[task.estimated_difficulty]);
    });
  
    return estimatedDifficultyOffArray;
  };

  export function dataRealTime (tasks: any): number[]  {
    const realTimeOffArray: number[] = [];
    tasks.forEach((task:any) => {
        realTimeOffArray.push(task.real_time_min);
    });
  
    return realTimeOffArray;
  };

  export function dataRealDifficulty (tasks: any): number[]  {
    const realDifficultyOffArray: number[] = [];
    tasks.forEach((task:any) => {
        realDifficultyOffArray.push(difficultyPercentages[task.real_difficulty]);
    });
  
    return realDifficultyOffArray;
  };

 export const xAxis = (n: number): number[] => {
    const result: number[] = [];
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  };