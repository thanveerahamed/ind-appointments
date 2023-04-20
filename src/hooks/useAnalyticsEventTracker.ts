import ReactGA from 'react-ga';

export const useAnalyticsEventTracker = (category: string) => {
  return (action: string, label: string) => {
    ReactGA.event({ category, action, label });
  };
};
