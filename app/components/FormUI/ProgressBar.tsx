import styles from "./FormUI.module.scss";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const getStepClassName = (isActive: boolean) => {
    const classes = [styles["progress__step"], isActive ? styles["progress__step--active"] : ""]
      .filter(Boolean)
      .join(" ");
    return classes;
  };

  return (
    <div
      className={[styles.progress, className].filter(Boolean).join(" ")}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <span>{`${currentStep} of ${totalSteps}`}</span>
      <div className={styles["progress__steps"]}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index + 1}
            className={getStepClassName(index + 1 <= currentStep)}
            aria-current={index + 1 === currentStep ? "step" : undefined}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
