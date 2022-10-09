import * as React from 'react';

import useIsMobile from '../../common/hooks/useIsMobile';
import ManualQueryMobileView from './mobile/ManualQueryMobileView';
import ManualQueryWebView from './web/ManualQueryWebView';

interface Props {
  loading: boolean;
  setLoading: (flag: boolean) => void;
}

const ManualQuery = (props: Props) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <ManualQueryMobileView {...props} />
  ) : (
    <ManualQueryWebView {...props} />
  );
};

export default ManualQuery;
