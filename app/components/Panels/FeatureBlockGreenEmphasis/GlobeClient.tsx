"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/app/components/react-bits/globe"), {
  ssr: false,
  loading: () => null,
});

export default Globe;
