import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('05ba42468a2ed965e148b1efea76d76', undefined, {
  defaultTracking: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
    fileDownloads: true,
  },
});
