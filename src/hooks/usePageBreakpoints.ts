import { useEffect, useState } from 'react';

/**
 * Custom hook to determine the current screen size breakpoint.
 * Listens to window resize events and updates the breakpoint accordingly.
 *
 * Breakpoints:
 * - "sm" : max-width 599px
 * - "md" : min-width 600px and max-width 899px
 * - "lg" : min-width 900px and max-width 1199px
 * - "xl" : min-width 1200px
 *
 * @example
 * const { breakPoint } = usePageBreakpoints();
 * console.log(breakPoint); // Outputs "sm", "md", "lg", or "xl"
 */
const usePageBreakpoints = () => {
  const [breakPoint, setBreakPoint] = useState('md');

  useEffect(() => {
    console.log('Is this happening?');
    const mediaQueries = [
      { name: 'sm', query: '(max-width: 599px)' },
      { name: 'md', query: '(min-width: 600px) and (max-width: 899px)' },
      { name: 'lg', query: '(min-width: 900px) and (max-width: 1199px)' },
      { name: 'xl', query: '(min-width: 1200px)' },
    ];

    const getCurrentBreakpoint = () => {
      const activeBreakpoint = mediaQueries.find(
        ({ query }) => window.matchMedia(query).matches
      );
      return activeBreakpoint ? activeBreakpoint.name : 'md';
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
      mql.addEventListener('change', handleBreakpointChange)
    );

    handleBreakpointChange();

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handleBreakpointChange)
      );
    };
  }, []);

  return { breakPoint };
};

export default usePageBreakpoints;
