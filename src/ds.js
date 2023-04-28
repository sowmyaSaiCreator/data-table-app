import { useEffect, useReducer, useState } from "react";

import "./App.css";

import { getUsersData } from "./Service/Service";
import ViewCard from "./components/ViewCard";
import DropDownMenu from "./components/DropDownMenu";

const ACTIONS = {
  FIRST_RENDER: "FIRST_RENDER",
};
const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case ACTIONS.FIRST_RENDER:
      return action.payload.data;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersData();
        dispatch({ type: "FIRST_RENDER", payload: { data: res } });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSave = (id, email) => {
    let result = users.map((user) => {
      if (user.id.value === id) {
        return { ...user, email: email };
      }
      return user;
    });
    gender === "all" ? setAllUsers(() => result) : setUsers(() => result);
  };

  const generateGroupBy = (value) => {
    let groupByType = allUsers.reduce((acc, item) => {
      // console.log(acc);
      // console.log(acc[item.gender]);
      (acc[item.gender] = acc[item.gender] || []).push(item);

      return acc;
    }, {});

    return groupByType;
  };

  const handleTypeChange = (value) => {
    console.log(value);
    setGender(() => value);
    if (value !== "all") {
      console.log(value);
      const groupArr = generateGroupBy(value);
      console.log(groupArr);

      console.log(groupArr[value]);
      setUsers(() => {
        return groupArr[value];
      });
      setNoSort(() => {
        return groupArr[value];
      });
    }
    sortByName(sort, value);
  };

  const generateUser = () => (gender === "all" ? allUsers : users);

  const sortByName = (sortV, value) => {
    console.log(sortV);
    setSort(() => sortV);

    if (sortV === "none") {
      gender === "all" ? setAllUsers(() => noSort) : setUsers(() => noSort);
      console.log(noSort);
    }
    let sortData = [];
    if (sortV === "asc") {
      sortData = generateUser().sort((a, b) =>
        a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
      );
      console.log(sortData);
    }
    if (sortV === "dsc") {
      sortData = generateUser().sort((a, b) =>
        a.name.last.toLowerCase() < b.name.last.toLowerCase() ? 1 : -1
      );
      // gender === "all" ? setAllUsers(() => sortData) : setUsers(() => sortData);
      console.log(sortData);
    }
    gender === "all" ? setAllUsers(() => sortData) : setUsers(() => sortData);
  };

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>MTM User Profiles</h1>
      <div className="align">
        <DropDownMenu
          // onTypeChange={handleTypeChange}
          dispatch={dispatch}
          props="gender"
        />
        <DropDownMenu onTypeChange={sortByName} props={"sort"} />
      </div>

      {generateUser().map((item, index) => {
        return <ViewCard user={item} handleSave={handleSave} key={index} />;
      })}
    </div>
  );
}

export default App;

// const logGender = (state, value) => {
//   return state.searchList.filter((data) => data.gender === value);
// };

// const groupByGender = (value, state) => {
//   if (value === "all") {
//     if (state.sortValue === "none")
//       //1.TODO search list
//       return {
//         ...state,
//         displayResults: [...state.searchList],
//       };

//     //Do Sorting for male/Female
//     return sortBy(state, " ", true);
//   }
//   const genderList = logGender(state, value);
//   //TODO search list
//   return {
//     ...state,
//     displayResults: [...genderList],
//     beforeSort: [...genderList],
//     searchList: [...genderList],
//   };
// };

// const genderData = (state, value) => {
//   const { sortValue } = state;
//   if (sortValue === "none") {
//     const data = groupByGender(value, state);
//     return data;
//   }
//   if (sortValue !== "none") {
//     const data = groupByGender(value, state);
//     return sortBy(state, sortValue, false, data);
//   }

//   return logGender(state, value, state.searchList);
// };
// const sortData = (data, value, state) => {
//   if (value === "none") {
//     console.log(state);
//     if (state.beforeSort) return state.beforeSort;
//   }
//   data.sort((a, b) => {
//     if (value === "asc")
//       return a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1;
//     if (value === "dsc")
//       return a.name.last.toLowerCase() < b.name.last.toLowerCase() ? 1 : -1;
//   });
//   return data;
// };

// const dataArr = (state, fromGender, display) => {
//   let displayData = [];
//   displayData = fromGender ? state.list : state.searchList;
//   if (display) displayData = display.searchList;
//   const sorting = sortData(displayData, state.sortValue, state);
//   return sorting;
// };

// const genderState = (state) => {
//   if (state.gender !== "all") {
//     return groupByGender(state.gender, state);
//   }
//   if (state.gender === "all") {
//     //TODO search list
//     return {
//       ...state,
//       displayResults: [...state.searchList],
//     };
//   }
// };
// const sortBy = (state, value, fromGender, display) => {
//   if (value === "all") {
//     console.log("here");
//     return genderState(state);
//   }

//   const displayData = dataArr(state, fromGender, display);

//   return {
//     ...state,
//     displayResults: [...displayData],
//   };
// };
