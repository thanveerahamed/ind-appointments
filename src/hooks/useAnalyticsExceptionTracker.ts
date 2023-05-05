import ReactGA from 'react-ga';

export const useAnalyticsExceptionTracker = () => {
  return (description: string, fatal: boolean = false) => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    ReactGA.exception({ description, fatal });
  };
};
