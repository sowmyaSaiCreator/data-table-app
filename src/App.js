import { useEffect, useReducer } from "react";

import "./App.css";

import { getUsersData } from "./Service/Service";
import ViewCard from "./Components/UI/ViewCard";
import DropDownMenu from "./Components/UI/DropDownMenu";

import SearchInput from "./Components/UI/SearchInput";
import { reducer } from "./Components/reducer/reducer";

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

  return (
    <div className="app">
      <h1 className="titleP">
        {state?.displayResults?.length} MTM User Profiles
      </h1>
      <div className="align">
        <SearchInput dispatch={dispatch} />
        <DropDownMenu dispatch={dispatch} type="gender" />
        <DropDownMenu dispatch={dispatch} type="sort" />
      </div>
      <div className="card--align">
        {state?.displayResults?.length > 0 ? (
          state?.displayResults?.map((item, index) => {
            return <ViewCard user={item} key={index} dispatch={dispatch} />;
          })
        ) : (
          <p className="title">No search results...</p>
        )}
      </div>
    </div>
  );
}

export default App;
