import React from "react";
import { NavLink } from "react-router-dom";

function Aside(props) {
  return (
    <div className="hidden md:block h-100% transition translate-all duration-300 text-md bg-indigo-100 p-3 ">
      <ul className="font-medium">
        {props.forHam &&
          props.forHam.map((ele, index) => {
            return (
              <li key={index + 1} className="mt-6 px-8 text-left">
                <NavLink to={`${ele.replace(/\s/g, "").toLowerCase()}`}>
                  <span className=" border-2 border-transparent hover:border-b-black">
                    {ele}
                  </span>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Aside;