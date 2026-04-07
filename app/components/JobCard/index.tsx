import Link from "next/link";
import styles from "./JobCard.module.scss";

interface JobCardProps {
  title: string;
  postedAt: string;
  location: string;
  department: string;
  workType: string;
  href: string;
}

const ClockIcon = () => (
  <svg className={styles["card__time-icon"]} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="9" cy="9" r="8" stroke="#1e2221" strokeWidth="1.5" />
    <path d="M9 5v4l2.5 2.5" stroke="#1e2221" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg className={styles["card__meta-icon"]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z" stroke="#1e2221" strokeWidth="1.5" />
    <circle cx="12" cy="8" r="2" stroke="#1e2221" strokeWidth="1.5" />
  </svg>
);

const DepartmentIcon = () => (
  <svg className={styles["card__meta-icon"]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9.25" stroke="#1e2221" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.25" stroke="#1e2221" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#1e2221" />
  </svg>
);

const WorkTypeIcon = () => (
  <svg className={styles["card__meta-icon"]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 20h18M5 20V10l7-7 7 7v10" stroke="#1e2221" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="14" width="6" height="6" stroke="#1e2221" strokeWidth="1.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 10h12M10 4l6 6-6 6" stroke="#063e2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const JobCard: React.FC<JobCardProps> = ({ title, postedAt, location, department, workType, href }) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles["card__header"]}>
        <h3 className={styles["card__title"]}>{title}</h3>
        <span className={styles["card__time-tag"]}>
          <ClockIcon />
          {postedAt}
        </span>
      </div>
      <div className={styles["card__footer"]}>
        <div className={styles["card__meta"]}>
          <div className={styles["card__meta-item"]}>
            <LocationIcon />
            {location}
          </div>
          <div className={styles["card__meta-item"]}>
            <DepartmentIcon />
            {department}
          </div>
          <div className={styles["card__meta-item"]}>
            <WorkTypeIcon />
            {workType}
          </div>
        </div>
        <div className={styles["card__arrow"]}>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
