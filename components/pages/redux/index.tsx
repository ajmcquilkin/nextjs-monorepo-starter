import { FormEventHandler, useState } from 'react';

import { fetchResourceById as fetchResourceByIdType } from 'store/actionCreators/resourceActionCreators';

import { Resource } from 'types/resource';
import { ConnectedThunkCreator } from 'types/state';

export interface ReduxStateProps {
  resourceMap: Record<string, Resource>,

  isLoading: boolean,
  errorMessage: string
}

export interface ReduxDispatchProps {
  fetchResourceById: ConnectedThunkCreator<typeof fetchResourceByIdType>
}

export interface ReduxPassedProps {

}

export type ReduxProps = ReduxStateProps & ReduxDispatchProps & ReduxPassedProps;

const Redux = ({
  resourceMap, isLoading, errorMessage, fetchResourceById
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

      { errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleRequestResource}>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Redux;
