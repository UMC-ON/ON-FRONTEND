import { SAVE_SCROLL_STATUS } from './actionTypes';

const initialScrollStatus = {
  scroll: 0,
  page: 0,
  itemList: [],
};

const scrollReducer = (state = initialScrollStatus, action) => {
  switch (action.type) {
    case SAVE_SCROLL_STATUS:
      return {
        ...state,
        totalPage: action.payload.totalPage,
        page: action.payload.page,
        itemList: [...action.payload.itemList],
      };
    default:
      return state;
  }
};

export default scrollReducer;
