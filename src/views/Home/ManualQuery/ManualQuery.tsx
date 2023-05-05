import * as React from 'react';

import useIsMobile from '../../../components/common/hooks/useIsMobile';
import ManualQueryMobileView from './mobile/ManualQueryMobileView';
import ManualQueryWebView from './web/ManualQueryWebView';

const ManualQuery = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <ManualQueryMobileView  />
  ) : (
    <ManualQueryWebView  />
  );
};

export default ManualQuery;
