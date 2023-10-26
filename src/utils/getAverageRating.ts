export const getAverageRating = (ratingArray: number[]) => {
  const averageSum =
    ratingArray.reduce((sum, secondValue) => sum + secondValue, 0) /
    ratingArray.length;
  // return Math.round((averageSum * 10) / 10);
  return averageSum;
};
