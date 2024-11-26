import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const addtasks = ({ trigger = false, setTrigger = () => {}, children }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close" onClick={() => setTrigger(false)}>
          <IoMdCloseCircleOutline className="close" />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default addtasks;
