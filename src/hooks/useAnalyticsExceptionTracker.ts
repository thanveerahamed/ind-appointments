import ReactGA from 'react-ga';

export const useAnalyticsExceptionTracker = () => {
  return (description: string, fatal: boolean = false) => {
    ReactGA.exception({ description, fatal });
  };
};
