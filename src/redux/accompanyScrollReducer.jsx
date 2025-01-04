import { SAVE_ACCOMPANY_SCROLL_STATUS } from './actionTypes';

const initialScrollStatus = {
  totalPage: 0,
  page: 0,
  itemList: [],
  startDate: null,  // 추가
  endDate: null,    // 추가
  gender: null,     // 추가
  country: null,    // 추가
};

const accompanyScrollReducer = (state = initialScrollStatus, action) => {
  // console.log('Action received:', action); // 디버깅
  switch (action.type) {
    case SAVE_ACCOMPANY_SCROLL_STATUS:
      // console.log('SAVE_ACCOMPANY_SCROLL_STATUS action:', action.payload); // 디버깅
      return {
        ...state,
        totalPage: action.payload.totalPage,
        page: action.payload.page,
        itemList: [...action.payload.itemList],
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        gender: action.payload.gender,
        country: action.payload.country,
      };
    default:
      return state;
  }
};

export default accompanyScrollReducer;
