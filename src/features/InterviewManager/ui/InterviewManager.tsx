import { useState, useMemo } from "react";
import styles from "./InterviewManager.module.scss";
import { Link } from "react-router-dom";
import { useMockInterviewList } from "../model/useMockInterviewList";

type SortKey = "date" | "avgAccuracy";
type SortDirection = "asc" | "desc";

export default function InterviewManager() {
  const { interviews, isLoading, error } = useMockInterviewList();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSort = (key: SortKey) => {
    const newDirection =
      sortKey === key && sortDirection === "desc" ? "asc" : "desc";
    setSortKey(key);
    setSortDirection(newDirection);
  };

  const displayedInterviews = useMemo(() => {
    let filteredInterviews = [...interviews];

    if (startDate) {
      filteredInterviews = filteredInterviews.filter((interview) => {
        const interviewDate = new Date(
          interview.date.split(".").reverse().join("-"),
        ).getTime();
        return interviewDate >= new Date(startDate).getTime();
      });
    }
    if (endDate) {
      filteredInterviews = filteredInterviews.filter((interview) => {
        const interviewDate = new Date(
          interview.date.split(".").reverse().join("-"),
        ).getTime();
        return interviewDate <= new Date(endDate).getTime();
      });
    }

    filteredInterviews.sort((a, b) => {
      if (sortKey === "date") {
        const dateA = new Date(a.date.split(".").reverse().join("-")).getTime();
        const dateB = new Date(b.date.split(".").reverse().join("-")).getTime();
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
      } else if (sortKey === "avgAccuracy") {
        return sortDirection === "desc"
          ? b.avgAccuracy - a.avgAccuracy
          : a.avgAccuracy - b.avgAccuracy;
      }
      return 0;
    });

    return filteredInterviews;
  }, [interviews, startDate, endDate, sortKey, sortDirection]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.managerContainer}>
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.dateFilters}>
            <label>
              Date from
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Date to
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Interview ID</th>
                <th
                  onClick={() => handleSort("date")}
                  className={styles.sortableHeader}
                >
                  Date
                  {sortKey === "date" && (
                    <span className={styles.sortIcon}>
                      {sortDirection === "desc" ? " ↓" : " ↑"}
                    </span>
                  )}
                </th>
                <th>Questions</th>
                <th>Answered</th>
                <th
                  onClick={() => handleSort("avgAccuracy")}
                  className={styles.sortableHeader}
                >
                  Avg Accuracy
                  {sortKey === "avgAccuracy" && (
                    <span className={styles.sortIcon}>
                      {sortDirection === "desc" ? " ↓" : " ↑"}
                    </span>
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedInterviews.length > 0 ? (
                displayedInterviews.map((interview) => (
                  <tr key={interview.id}>
                    <td>{`#${interview.id}`}</td>
                    <td>{interview.date}</td>
                    <td>{interview.questions}</td>
                    <td>{`${interview.answered} / ${interview.totalQuestions} (${Math.round((interview.answered / interview.totalQuestions) * 100)}%)`}</td>
                    <td>{`${interview.avgAccuracy}%`}</td>
                    <td>
                      {interview.status === "finished" ? (
                        <Link to={`/result/${interview.id}`}>View →</Link>
                      ) : (
                        <span style={{ color: "orange" }}>In Progress</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    You have not taken an interview yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
