import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

const initialState: ModalState = {
  type: null,
  title: '',
  content: '',
};

const modalReducer = (state = initialState, action: Actions): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.config.title || '',
        content: action.payload.config.content || '',
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        type: null,
        title: initialState.title,
        content: initialState.content,
      };

    default:
      return state;
  }
};

export default modalReducer;
