// import { useState, useEffect } from "react";

// const useOnWideScreen = (minWidth = 1024) => {
//   const [isWideScreen, setIsWideScreen] = useState(
//     typeof window !== "undefined" ? window.innerWidth >= minWidth : false
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setIsWideScreen(window.innerWidth >= minWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [minWidth]);

//   return isWideScreen;
// };

// export { useOnWideScreen };

import { useTheme, useMediaQuery } from "@mui/material";

const useOnWideScreen = (breakpoint = "lg") => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
};
export { useOnWideScreen };
