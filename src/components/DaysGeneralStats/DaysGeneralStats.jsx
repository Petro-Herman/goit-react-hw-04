import React from "react";
import styles from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({ dayStats, selectedDate, onClose }) => {
  if (!dayStats) {
    return null; // Якщо даних немає, нічого не показуємо
  }

  const formattedDate = `${selectedDate.getDate()} ${selectedDate.toLocaleString(
    "default",
    { month: "long" }
  )}`;

  const dailyNorm = dayStats.dailyNorm || 0; // Запланована денна норма
  const intake = dayStats.intake || 0; // Фактична кількість
  const percentage = dailyNorm ? Math.round((intake / dailyNorm) * 100) : 0; // Відсотки
  const portions = dayStats.portions || 0; // Кількість порцій

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h3 className={styles.title}>Day Statistics</h3>
        <div className={styles.section}>
          <strong>Date:</strong> <span>{formattedDate}</span>
        </div>
        <div className={styles.section}>
          <strong>Daily Norm:</strong> <span>{dailyNorm} l</span>
        </div>
        <div className={styles.section}>
          <strong>Norm Completion:</strong> <span>{percentage}%</span>
        </div>
        <div className={styles.section}>
          <strong>Portions:</strong> <span>{portions}</span>
        </div>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
