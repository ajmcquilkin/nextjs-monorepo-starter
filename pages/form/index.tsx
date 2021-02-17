import { useRouter } from 'next/router';
import { useEffect } from 'react';

const FormRedirect = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => { router.push('/form/new'); }, []);
  return (<div>Redirecting...</div>);
};

export default FormRedirect;
