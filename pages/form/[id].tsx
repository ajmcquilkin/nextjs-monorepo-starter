import { GetServerSideProps } from 'next';

interface FullViewProps {
  id: string
}

const FullView = ({ id }: FullViewProps): JSX.Element => (
  <div>
    FullView Page with id of
    {' '}
    &quot;
    {id}
    &quot;
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: {
    id: params.id
  }
});

export default FullView;
