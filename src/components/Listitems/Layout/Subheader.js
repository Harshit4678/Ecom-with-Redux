import { NavLink } from "react-router-dom";

const Subheader = () => {
  return (
    <div className="subheader-container">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/category-1/ ">Electronics</NavLink>
        </li>
        <li>
          <NavLink to="/category-2/ ">Fashion</NavLink>
        </li>
        <li>
          <NavLink to="/category-3/ ">Home Appliances</NavLink>
        </li>
        <li>
          <NavLink to="/category-4/ ">Beauty</NavLink>
        </li>
        <li>
          <NavLink to="/category-5/ ">Sports</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Subheader;
