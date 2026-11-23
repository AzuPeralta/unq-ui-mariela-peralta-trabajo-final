const LEADERBOARD_KEY = "leaderboard";

const MAX_SCORES = 10;

export const getLeaderBoard = () =>
  JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");

export const saveNewScore = (newScore) => {
  const existingScores = getLeaderBoard();

  const updatedScores = [...existingScores, newScore]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SCORES);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedScores));
  return updatedScores;
};
