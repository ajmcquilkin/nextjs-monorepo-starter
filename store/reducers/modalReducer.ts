import { ModalState } from 'types/modal';
import { Actions } from 'types/state';

const initialState: ModalState = {
  type: null,

  title: '',
  content: '',

  bgColor: '#FFFFFF',
  postId: null
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

        bgColor: action.payload.data.config.bgColor || initialState.bgColor,
        postId: action.payload.data.config.postId || initialState.postId
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        type: null,

        title: initialState.title,
        content: initialState.content,

        bgColor: initialState.bgColor,
        postId: initialState.postId
      };

    default:
      return state;
  }
};

export default modalReducer;