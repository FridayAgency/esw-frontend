import React from "react";

interface IconProps {
  trackRef: React.RefObject<SVGPathElement | null>;
  dotRef: React.RefObject<SVGPathElement | null>;
}

type IconRenderer = (props: IconProps) => React.JSX.Element;

export const icons: Record<string, IconRenderer> = {
  basket: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M71.8331 59.9302L68.7031 88.1202"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M84.364 59.93L71.834 38" stroke="#1E2221" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M31.1035 59.9302H93.7535"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={trackRef}
        d="M35.8047 59.9302C43.7547 98.7602 38.5847 86.0002 77.7847 88.1202C80.7347 88.2202 83.5047 86.0102 84.0447 83.1102L89.3747 59.9302"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.9336 74.0303H85.9236"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5039 59.93L53.0339 38"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53.0332 59.9302L56.1632 88.1202"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M70.1034 70.0001C75.2934 69.9201 75.2934 78.0801 70.1034 78.0001C64.9134 78.0801 64.9134 69.9201 70.1034 70.0001Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  globe: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ref={trackRef}
        d="M62.434 94.65C103.394 94.47 103.394 32.17 62.434 32C21.254 32.7 21.264 93.96 62.434 94.65Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.433 32C45.853 48.78 45.853 77.88 62.433 94.65C79.013 77.87 79.013 48.77 62.433 32Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.1035 63.3301H93.7535"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M74.9042 59.7301C80.0942 59.6501 80.0942 67.8101 74.9042 67.7301C69.7142 67.8101 69.7142 59.6501 74.9042 59.7301Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  monitor: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64.0645 78.8599V91.3899"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.5234 91.3901H76.5834"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={trackRef}
        d="M89.1235 35.0001C26.4835 38.0301 32.4835 20.3501 32.7335 72.5901C32.7335 76.0501 35.5335 78.8601 38.9935 78.8601C101.633 75.8301 95.6335 93.5101 95.3835 41.2701C95.3835 37.8101 92.5835 35.0001 89.1235 35.0001Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M33.1034 54.0001C38.2934 53.9201 38.2934 62.0801 33.1034 62.0001C27.9134 62.0801 27.9134 53.9201 33.1034 54.0001Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  mouseArrow: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M65.1328 66.04L85.2228 86.1301"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={trackRef}
        d="M37.2649 36.12C29.3149 31.7 57.0149 88.44 55.5849 88.28C56.0949 89.63 58.2249 89.51 58.5549 88.09C65.4449 61.27 60.4749 66.34 87.1949 59.45C97.2449 57.12 35.8749 36.92 37.2649 36.12Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M58.7245 40.0001C63.9145 39.9201 63.9145 48.0801 58.7245 48.0001C53.5345 48.0801 53.5345 39.9201 58.7245 40.0001Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  shield: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ref={trackRef}
        d="M87.2243 68.4602C87.2243 84.1202 76.2643 91.9602 63.2243 96.5002C49.3643 94.1202 37.0843 84.1802 37.0943 68.4602V46.5302C36.6243 41.4802 49.7743 44.9002 59.7743 34.8802C63.4643 30.9002 73.2243 44.3802 84.0843 43.4002C85.7643 43.3702 87.2543 44.8502 87.2143 46.5302V68.4602H87.2243Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.7637 65.3301L59.0337 71.5901L71.5637 59.0601"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M61.1835 30.0001C66.3735 29.9201 66.3735 38.0801 61.1835 38.0001C55.9935 38.0801 55.9935 29.9201 61.1835 30.0001Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  growth: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M62.4336 75.7197V91.3798"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M74.9648 69.46V91.39" stroke="#1E2221" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M87.4941 56.9302V91.3902"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={trackRef}
        d="M31.1035 72.6L51.9235 51.78C52.2235 51.49 52.6135 51.32 53.0335 51.32C53.5235 50.53 64.0035 61.88 64.4535 62.09C65.9035 65.51 92.4735 35.13 93.7535 35"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.3633 81.9902V91.3903"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M49.9043 69.46V91.39" stroke="#1E2221" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        ref={dotRef}
        d="M36.8925 63.0006C42.0825 62.9206 42.0825 71.0806 36.8925 71.0006C31.7025 71.0806 31.7025 62.9206 36.8925 63.0006Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),

  profile: ({ trackRef, dotRef }) => (
    <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M81.2228 88.3899C81.1228 63.7999 43.7328 63.8399 43.6328 88.3899"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.4333 69.5898C78.8233 69.5198 78.8233 44.5998 62.4333 44.5298C46.0433 44.5998 46.0533 69.5198 62.4333 69.5898Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={trackRef}
        d="M62.434 94.65C103.394 94.47 103.394 32.17 62.434 32C21.254 32.71 21.264 93.96 62.434 94.65Z"
        stroke="#1E2221"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={dotRef}
        d="M76.9941 72.0001C82.1841 71.9201 82.1841 80.0801 76.9941 80.0001C71.8041 80.0801 71.8041 71.9201 76.9941 72.0001Z"
        fill="#00D180"
        stroke="#1E2221"
        strokeWidth="3"
      />
    </svg>
  ),
};

export type IconKey = keyof typeof icons;
export const DEFAULT_ICON: IconKey = "basket";
