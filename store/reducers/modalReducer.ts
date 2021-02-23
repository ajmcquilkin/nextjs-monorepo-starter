import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

const initialState: ModalState = {
  active: null
};

const modalReducer = (state = initialState, action: Actions): ModalState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        active: action.payload.data.type
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        active: null
      };

    default:
      return state;
  }
};

export default modalReducer;
