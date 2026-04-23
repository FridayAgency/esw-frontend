import Container from "@/app/components/Container";
import { PagePanelsPagePanelsBlocksDividerLayout } from "@/types/graphql";

import styles from "./Divider.module.scss";

interface DividerProps {
  panel: PagePanelsPagePanelsBlocksDividerLayout;
}

const Divider: React.FC<DividerProps> = ({ panel }) => {
  return (
    <Container className={styles["divider"]}>
      <svg width="375" height="120" viewBox="0 0 375 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3855_8704)">
          <path
            d="M127.033 74.839C124.678 55.7698 250.333 55.7698 247.967 74.839C250.322 93.9081 124.667 93.9081 127.033 74.839Z"
            stroke="#063E2D"
            stroke-width="0.582547"
            stroke-linecap="round"
            stroke-dasharray="2.22 2.22"
          />
          <path
            d="M127.033 45.1632C124.678 64.2323 250.333 64.2323 247.967 45.1632C250.322 26.094 124.667 26.094 127.033 45.1632Z"
            stroke="#063E2D"
            stroke-width="0.582547"
            stroke-linecap="round"
            stroke-dasharray="2.22 2.22"
          />
          <path
            d="M127.033 90.3706C126.515 50.8582 248.5 50.8687 247.967 90.3706C248.485 129.878 126.5 129.872 127.033 90.3706Z"
            stroke="#063E2D"
            stroke-width="0.582547"
            stroke-linecap="round"
          />
          <path
            d="M127.033 29.6284C126.515 69.1408 248.5 69.1302 247.967 29.6284C248.485 -9.87877 126.5 -9.87348 127.033 29.6284Z"
            stroke="#063E2D"
            stroke-width="0.582547"
            stroke-linecap="round"
          />
          <path
            d="M234.342 12.1876C234.284 8.05985 240.759 8.05985 240.7 12.1876C240.759 16.3154 234.284 16.3154 234.342 12.1876Z"
            fill="#00D180"
            stroke="#063E2D"
            stroke-width="0.582547"
          />
          <path
            d="M129.729 102.777C129.671 98.6497 136.145 98.6497 136.087 102.777C136.145 106.905 129.671 106.905 129.729 102.777Z"
            fill="#00D180"
            stroke="#063E2D"
            stroke-width="0.582547"
          />
          <path
            d="M189.354 30.088C189.296 25.9602 195.77 25.9602 195.712 30.088C195.77 34.2158 189.296 34.2158 189.354 30.088Z"
            fill="#00D180"
            stroke="#063E2D"
            stroke-width="0.582547"
          />
          <rect x="120.301" y="-5.53516" width="131.364" height="140.394" fill="url(#paint0_linear_3855_8704)" />
          <rect
            x="251.666"
            y="134.859"
            width="131.364"
            height="140.394"
            transform="rotate(180 251.666 134.859)"
            fill="url(#paint1_linear_3855_8704)"
          />
        </g>
        <path d="M0 60L375 60" stroke="#063E2D" stroke-width="0.4" />
        <rect width="75" height="120" transform="matrix(-1 0 0 1 375 0)" fill="url(#paint2_linear_3855_8704)" />
        <rect width="75" height="120" fill="url(#paint3_linear_3855_8704)" />
        <defs>
          <linearGradient
            id="paint0_linear_3855_8704"
            x1="217.732"
            y1="37.719"
            x2="177.827"
            y2="131.072"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0399967" stop-color="white" />
            <stop offset="0.755107" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3855_8704"
            x1="352.447"
            y1="163.695"
            x2="338.029"
            y2="208.697"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0399967" stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_3855_8704"
            x1="14.5"
            y1="66.4286"
            x2="55.3129"
            y2="94.7744"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_3855_8704"
            x1="14.5"
            y1="66.4286"
            x2="55.3129"
            y2="94.7744"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_3855_8704">
            <rect width="121" height="120" fill="white" transform="translate(127)" />
          </clipPath>
        </defs>
      </svg>
    </Container>
  );
};

export default Divider;
