import { FormEventHandler, useState } from 'react';
import { fetchResourceById as fetchResourceByIdType } from 'store/actionCreators/resourceActionCreators';
import { Resource } from 'types/resource';

export interface ReduxStateProps {
  resourceMap: Record<string, Resource>,

  isLoading: boolean,
  errorMessages: string[]
}

export interface ReduxDispatchProps {
  fetchResourceById: typeof fetchResourceByIdType
}

export interface ReduxPassedProps {

}

export type ReduxProps = ReduxStateProps & ReduxDispatchProps & ReduxPassedProps;

const Redux = ({
  resourceMap, isLoading, errorMessages, fetchResourceById
}: ReduxProps): JSX.Element => {
  const [id, setId] = useState<string>('');

  const handleRequestResource: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetchResourceById(id);
  };

  return (
    <div>
      <h1>Redux Connected Component / Page Demo</h1>

      <h2>Post:</h2>
      {isLoading
        ? <p>Loading...</p>
        : (
          <div>
            <p>{resourceMap[id]?.content}</p>
            {resourceMap[id]?.link && <a href={resourceMap[id].link as string}>{resourceMap[id].link}</a>}
          </div>
        )}

      { errorMessages && <p>{errorMessages[0]}</p>}

      <form onSubmit={handleRequestResource}>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Redux;
