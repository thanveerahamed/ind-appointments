import loadingAnimation from '../../../../assets/lottie/mobileLoader.json';
import Lottie from 'lottie-react';

const MobileLoading = () => {
  return (
    <Lottie
      animationData={loadingAnimation}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    />
  );
};

export default MobileLoading;
