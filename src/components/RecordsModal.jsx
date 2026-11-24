import { useState } from "react";
import { Modal } from "./Modal";
import { Leaderboard } from "./Leaderboard";
import { getLeaderBoard } from "../services/leaderboardStorage";

export const RecordsModal = ({ onClose }) => {
  const [scores] = useState(() => getLeaderBoard());

  return (
    <Modal title="HIGH SCORES" onClose={onClose}>
      <Leaderboard scores={scores} showTitle={false} />
    </Modal>
  );
};
