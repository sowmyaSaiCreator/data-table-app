import { useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ACTIONS from "../../Constant/constant";
import "./DropDown.css";

const DropDownMenu = ({ dispatch, type }) => {
  const input = useRef();

  const handleDropdown = (e) => {
    dispatch({
      type: type === "gender" ? ACTIONS.SELECT_GENDER : ACTIONS.SELECT_SORT,
      payload: { value: e.target.value, ref: input.current.value },
    });
  };

  return (
    <Dropdown>
      <div>
        <select
          className="form-select  from-control color--aqua"
          onChange={handleDropdown}
          ref={input}
        >
          <option value={type === "gender" ? "all" : "none"}>
            {type === "gender" ? "All" : "No Sort"}
          </option>
          <option value={type === "gender" ? "male" : "asc"}>
            {type === "gender" ? "Male" : "Sort ASC"}
          </option>
          <option value={type === "gender" ? "female" : "dsc"}>
            {type === "gender" ? "Female" : "Sort DSC"}
          </option>
        </select>
      </div>
    </Dropdown>
  );
};

export default DropDownMenu;
