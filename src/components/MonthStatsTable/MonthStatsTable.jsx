// import { useState } from "react";
// import css from "./MonthStatsTable.module.css";

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const getFirstDayOfMonth = () =>
//     new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const generateCalendarDays = () => {
//     const daysInMonth = getDaysInMonth(currentDate);
//     const firstDayOfMonth = getFirstDayOfMonth(currentDate).getDay(); // День тижня (0 - Нд, 6 - Сб)

//     const days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(null);
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }

//     return days;
//   };

//   const days = generateCalendarDays();

//   const handlePrevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   return (
//     <div className={css.calendarContainer}>
//       <div className={css.header}>
//         <button onClick={handlePrevMonth}>{"<"}</button>
//         <h2>
//           {currentDate.toLocaleString("default", { month: "long" })},{" "}
//           {currentDate.getFullYear()}
//         </h2>
//         <button onClick={handleNextMonth}>{">"}</button>
//       </div>

//       <div className={css.weekdays}>
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className={css.weekday}>
//             {day}
//           </div>
//         ))}
//       </div>

//       <div className={css.grid}>
//         {days.map((day, index) =>
//           day ? (
//             <div key={index} className={css.day}>
//               <div className="day-number">{day}</div>
//               <div className="percentage">
//                 {Math.floor(Math.random() * 101)}%
//               </div>
//             </div>
//           ) : (
//             <div key={index} className={css.empty}></div> // Пусті комірки
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import { useState, useEffect } from "react";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import styles from "./MonthStatsTable.module.css";

const MobileCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysStats, setDaysStats] = useState([]);

  // Завантаження даних з бекенду
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/days-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDaysStats(data);
      } catch (error) {
        console.error("Error fetching days stats:", error);
      }
    };

    fetchData();
  }, []);

  // Отримання кількості днів у місяці
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Перехід до попереднього місяця
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Перехід до наступного місяця (з обмеженням)
  const handleNextMonth = () => {
    const now = new Date();
    if (
      currentDate.getFullYear() < now.getFullYear() ||
      (currentDate.getFullYear() === now.getFullYear() &&
        currentDate.getMonth() < now.getMonth())
    ) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  // Генерація списку днів
  const generateDays = () => {
    const daysInMonth = getDaysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const days = generateDays();

  {
    days.map((day) => {
      const dayStats = daysStats?.[day - 1] || null;
      const isPlanMet = dayStats && dayStats.percentage >= 100;

      return (
        <div
          key={day}
          className={`${styles.day} ${!isPlanMet ? styles.incomplete : ""}`}
          onClick={() => setSelectedDay(day)}
        >
          <div className={styles.dayNumber}>{day}</div>
          {dayStats && (
            <div className={styles.percentage}>
              {dayStats.percentage}% {/* Відображаємо відсоток */}
            </div>
          )}
        </div>
      );
    });
  }

  const handleDayClick = (day) => {
    setSelectedDay({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      stats: daysStats[day - 1] || null,
    });
  };

  const handleCloseStats = () => setSelectedDay(null);

  return (
    <div className={styles.calendarContainer}>
      {/* Пагінатор */}
      <div className={styles.paginator}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        {new Date().getMonth() !== currentDate.getMonth() ? (
          <button onClick={handleNextMonth}>&gt;</button>
        ) : (
          <div className={styles.hiddenButton}></div>
        )}
      </div>

      {/* Перелік днів */}
      <div className={styles.daysList}>
        {days.map((day) => {
          const dayStats = daysStats?.[day - 1] || null;
          const isPlanMet = dayStats && dayStats.percentage >= 100;

          return (
            <div
              key={day}
              className={`${styles.day} ${!isPlanMet ? styles.incomplete : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              <div className={styles.dayNumber}>{day}</div>
              {dayStats && (
                <div className={styles.percentage}>{dayStats.percentage}%</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Детальна статистика по дню */}
      {selectedDay && (
        <div className={styles.generalStats}>
          <h3>Day {selectedDay} Stats</h3>
          <p>{`Water intake: ${
            daysStats[selectedDay - 1]?.intake || "No data"
          } ml`}</p>
          <button onClick={() => setSelectedDay(null)}>Close</button>
        </div>
      )}

      {/* {selectedDay && (
        <DaysGeneralStats
          dayStats={selectedDay.stats}
          selectedDate={selectedDay.date}
          onClose={handleCloseStats}
        />
      )} */}
    </div>
  );
};

export default MobileCalendar;
