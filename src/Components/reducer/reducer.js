import ACTIONS from "../../Constant/constant";

const getGenderList = (list, value) => {
  if (value === "all") return list;
  return list.filter((data) => data.gender === value);
};

const getSortDataList = (list, value, state) => {
  const data = list.sort((a, b) => {
    if (value === "asc")
      return a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1;
    if (value === "dsc")
      return a.name.last.toLowerCase() < b.name.last.toLowerCase() ? 1 : -1;
    if (value === "none") {
      return state.genderList;
    }
  });
  return data;
};
const getSearchList = (list, value) => {
  return list.filter((data) => data.name.last.toLowerCase().includes(value));
};

const genderDataCopy = (list, searchList, state) => {
  if (
    state.gender === "all" &&
    state.sortValue === "none" &&
    !state.searchValue
  ) {
    state.genderList = [...list];
    return list;
  } else {
    state.genderList = [...getGenderList(searchList, state.gender)];
    return getGenderList(searchList, state.gender);
  }
};

const getSearchGenderSortList = (state) => {
  let searchList = [];
  let sortData = [];
  if (state.searchValue === undefined || state.searchValue === "")
    searchList = state.list;
  else searchList = getSearchList(state.list, state.searchValue);
  state.noSort = searchList;

  const genderData = genderDataCopy(state.list, searchList, state); //TODO
  sortData = getSortDataList(genderData, state.sortValue, state);
  return sortData;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FIRST_RENDER:
      const data = action.payload.data;
      return {
        list: [...data],
        displayResults: [...data],
        gender: "all",
        sortValue: "none",
        noSort: [...data],
        searchList: [...data],
      };

    case ACTIONS.SAVE_DATA:
      const { id, email } = action.payload;
      const emailData = state.searchList.map((data) => {
        if (data.id.value === id) return { ...data, email };
        return data;
      });
      return {
        ...state,
        displayResults: [...emailData],
        searchList: [...emailData],
      };

    case ACTIONS.SELECT_GENDER:
      const { value } = action.payload;
      state.gender = value;
      const searchGenderWithSorting = getSearchGenderSortList(state);
      return {
        ...state,
        displayResults: searchGenderWithSorting,
      };

    case ACTIONS.SELECT_SORT:
      const { value: sortValue } = action.payload;
      state.sortValue = sortValue;
      const searchSortingWithGender = getSearchGenderSortList(state);
      return {
        ...state,
        displayResults: searchSortingWithGender,
      };

    case ACTIONS.SEARCH_LIST:
      const { value: searchVal } = action.payload;
      state.searchValue = searchVal;
      const result = getSearchGenderSortList(state);

      return {
        ...state,
        displayResults: result,
        searchList: result,
      };

    default:
      return state;
  }
};
