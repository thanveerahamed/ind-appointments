import ReactGA from 'react-ga';

export const useAnalyticsEventTracker = (category: string) => {
  return (action: string, label: string) => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    ReactGA.event({ category, action, label });
  };
};
