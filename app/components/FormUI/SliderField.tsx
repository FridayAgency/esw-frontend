import type { CSSProperties } from "react";
import styles from "./FormUI.module.scss";

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  displayValue: string;
  valuePrefix?: string;
  ariaLabel?: string;
  ticks?: number;
  tickLabels?: string[];
  showNav?: boolean;
  suffix?: string;
}

const SliderField = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
  valuePrefix,
  ariaLabel,
  ticks = 10,
  tickLabels,
  showNav = true,
  suffix,
}: SliderFieldProps) => {
  const percent = ((value - min) / (max - min)) * 100;
  const clampValue = (nextValue: number) => Math.min(max, Math.max(min, nextValue));
  const handleDecrease = () => onChange(clampValue(value - step));
  const handleIncrease = () => onChange(clampValue(value + step));
  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <div className={styles.sliderCard}>
      <div className={styles.sliderHeader}>
        <div>
          <span className={styles.sliderLabel}>{label}</span>
          <div className={styles.sliderValue}>
            <div>
              {valuePrefix && (
                <span className={styles.sliderCurrency}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.75 20.0422C19.8376 20.1401 19.9051 20.2543 19.9485 20.3783C19.992 20.5023 20.0106 20.6336 20.0033 20.7648C19.996 20.896 19.9629 21.0244 19.9059 21.1428C19.849 21.2612 19.7692 21.3672 19.6712 21.4547C18.2959 22.6863 16.6066 23.513 14.7903 23.8435C12.974 24.174 11.1017 23.9952 9.38072 23.327C7.65978 22.6588 6.15741 21.5272 5.04002 20.0576C3.92264 18.5881 3.23387 16.8379 3.05 15.001H1C0.734784 15.001 0.48043 14.8956 0.292893 14.7081C0.105357 14.5205 0 14.2662 0 14.001C0 13.7357 0.105357 13.4814 0.292893 13.2939C0.48043 13.1063 0.734784 13.001 1 13.001H3V11.001H1C0.734784 11.001 0.48043 10.8956 0.292893 10.7081C0.105357 10.5205 0 10.2662 0 10.001C0 9.73575 0.105357 9.48139 0.292893 9.29386C0.48043 9.10632 0.734784 9.00097 1 9.00097H3.05C3.23437 7.16474 3.92326 5.41535 5.04042 3.94644C6.15758 2.47754 7.65943 1.34643 9.3797 0.678326C11.1 0.0102205 12.9716 -0.168817 14.7873 0.161032C16.6031 0.490881 18.2921 1.31675 19.6675 2.54721C19.8653 2.72425 19.9846 2.97258 19.9992 3.2376C20.0139 3.50261 19.9227 3.76259 19.7456 3.96034C19.5686 4.15809 19.3203 4.27742 19.0552 4.29207C18.7902 4.30672 18.5303 4.2155 18.3325 4.03847C17.2449 3.06658 15.9123 2.41052 14.4788 2.14126C13.0453 1.87199 11.5654 1.99976 10.1993 2.51075C8.83311 3.02173 7.63266 3.89649 6.72773 5.04041C5.8228 6.18433 5.24783 7.55389 5.065 9.00097H13C13.2652 9.00097 13.5196 9.10632 13.7071 9.29386C13.8946 9.48139 14 9.73575 14 10.001C14 10.2662 13.8946 10.5205 13.7071 10.7081C13.5196 10.8956 13.2652 11.001 13 11.001H5V13.001H11C11.2652 13.001 11.5196 13.1063 11.7071 13.2939C11.8946 13.4814 12 13.7357 12 14.001C12 14.2662 11.8946 14.5205 11.7071 14.7081C11.5196 14.8956 11.2652 15.001 11 15.001H5.065C5.24764 16.4481 5.82247 17.8179 6.72732 18.9619C7.63217 20.106 8.8326 20.9809 10.1988 21.4921C11.565 22.0032 13.0449 22.1311 14.4785 21.8619C15.9121 21.5927 17.2448 20.9366 18.3325 19.9647C18.4304 19.8763 18.5449 19.8081 18.6693 19.7641C18.7937 19.72 18.9256 19.7011 19.0574 19.7083C19.1892 19.7155 19.3182 19.7487 19.4371 19.806C19.5559 19.8633 19.6623 19.9436 19.75 20.0422Z"
                      fill="#345478"
                    />
                  </svg>
                </span>
              )}
              <span className={styles.sliderValueText}>{displayValue}</span>
              {!valuePrefix && <span className={styles.sliderValueSuffix}>{suffix}</span>}
            </div>

            {showNav && (
              <div className={styles.sliderNav}>
                <button
                  type="button"
                  className={styles.sliderNavButton}
                  onClick={handleDecrease}
                  disabled={isMin}
                  aria-label={`Decrease ${label}`}
                >
                  <svg
                    width="32"
                    height="36"
                    viewBox="0 0 32 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M32 0H18C8.05887 0 0 8.05888 0 18C0 27.9411 8.05887 36 18 36H32V0Z" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.4275 18C11.4275 18.2926 11.5395 18.5851 11.7623 18.808L18.6192 25.6649C19.0661 26.1117 19.7883 26.1117 20.2352 25.6649C20.682 25.218 20.682 24.4958 20.2352 24.0489L14.1863 18L20.2352 11.9511C20.682 11.5042 20.682 10.782 20.2352 10.3351C19.7883 9.8883 19.0661 9.8883 18.6192 10.3351L11.7623 17.192C11.5395 17.4149 11.4275 17.7074 11.4275 18Z"
                      fill="#A0B4CB"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.sliderNavButton}
                  onClick={handleIncrease}
                  disabled={isMax}
                  aria-label={`Increase ${label}`}
                >
                  <svg
                    width="32"
                    height="36"
                    viewBox="0 0 32 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M0 0H14C23.9411 0 32 8.05888 32 18C32 27.9411 23.9411 36 14 36H0V0Z" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.5725 18C20.5725 18.2926 20.4605 18.5851 20.2377 18.808L13.3808 25.6649C12.9339 26.1117 12.2117 26.1117 11.7648 25.6649C11.318 25.218 11.318 24.4958 11.7648 24.0489L17.8137 18L11.7648 11.9511C11.318 11.5042 11.318 10.782 11.7648 10.3351C12.2117 9.8883 12.9339 9.8883 13.3808 10.3351L20.2377 17.192C20.4605 17.4149 20.5725 17.7074 20.5725 18Z"
                      fill="#A0B4CB"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.sliderControl}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.slider}
          style={{ "--slider-percent": `${percent}%` } as CSSProperties}
          aria-label={ariaLabel || label}
        />
        <div className={styles.sliderTicks} aria-hidden="true">
          {Array.from({ length: ticks }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        {tickLabels && tickLabels.length > 0 && (
          <div className={styles.sliderLabels} aria-hidden="true">
            {tickLabels.map((tickLabel) => (
              <span key={tickLabel}>{tickLabel}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderField;
