import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

const initialState: ModalState = {
  type: null,
  title: '',
  content: '',
  bgColor: '#FFFFFF'
};

const modalReducer = (state = initialState, action: Actions): ModalState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        type: action.payload.data.type,
        title: action.payload.data.config.title || '',
        content: action.payload.data.config.content || '',
        bgColor: action.payload.data.config.bgColor || '#FFFFFF'
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        type: null,
        title: '',
        content: '',
        bgColor: '#FFFFFF'
      };

    default:
      return state;
  }
};

export default modalReducer;
