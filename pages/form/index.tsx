import { useRouter } from 'next/router';
import { useEffect } from 'react';

import LoadingScreen from 'components/layout/loadingScreen';

const FormRedirect = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => { router.push('/form/new'); }, []);
  return (
    <LoadingScreen
      title="You are being redirected..."
      subtitle="Please do not leave this page."
    />
  );
};

export default FormRedirect;
