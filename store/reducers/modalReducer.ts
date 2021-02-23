import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

const initialState: ModalState = {
  type: null,

  title: '',
  content: '',

  confirm: '',
  reject: '',
  cancel: '',

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

        confirm: action.payload.data.config.confirm || '',
        reject: action.payload.data.config.reject || '',
        cancel: action.payload.data.config.cancel || '',

        bgColor: action.payload.data.config.bgColor || initialState.bgColor
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        type: null,

        title: initialState.title,
        content: initialState.content,

        confirm: initialState.confirm,
        reject: initialState.reject,
        cancel: initialState.cancel,

        bgColor: initialState.bgColor
      };

    default:
      return state;
  }
};

export default modalReducer;
