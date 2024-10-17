import { useEffect, useState } from "react";

const usePageBreakpoints = () => {
  const [breakPoint, setBreakPoint] = useState("md");

  useEffect(() => {
    const mediaQueries = [
      { name: "sm", query: "(max-width: 599px)" },
      { name: "md", query: "(min-width: 600px) and (max-width: 899px)" },
      { name: "lg", query: "(min-width: 900px) and (max-width: 1199px)" },
      { name: "xl", query: "(min-width: 1200px)" },
    ];

    const getCurrentBreakpoint = () => {
      const activeBreakpoint = mediaQueries.find(
        ({ query }) => window.matchMedia(query).matches
      );
      return activeBreakpoint ? activeBreakpoint.name : "md";
    };

    const handleBreakpointChange = () => {
      const currentBreakpoint = getCurrentBreakpoint();
      setBreakPoint((prevBreakpoint) =>
        prevBreakpoint !== currentBreakpoint
          ? currentBreakpoint
          : prevBreakpoint
      );
    };

    const mediaQueryLists = mediaQueries.map(({ query }) =>
      window.matchMedia(query)
    );

    mediaQueryLists.forEach((mql) =>
      mql.addEventListener("change", handleBreakpointChange)
    );

    handleBreakpointChange();

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handleBreakpointChange)
      );
    };
  }, []);

  return { breakPoint };
};

export default usePageBreakpoints;
