import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CiStickyNote } from "react-icons/ci";

const notifications = () => {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <div className="notifs">
        <div className="notif">
          <div className="icon">
            <CiStickyNote />
          </div>
          <div className="message">
            <p>
              <b>Note:</b> Already done taking a bath.
            </p>
            <small class="text-muted"> 2 minutes ago</small>
          </div>
          <div className="icon">
            <IoIosNotifications />
          </div>
          <div className="update">
            <p>
              <b>Update:</b> Done taking Medicine.
            </p>
            <small class="text-muted"> 5 minutes ago</small>
          </div>
          <div className="icon">
            <CiStickyNote />
          </div>
          <div className="message">
            <p>
              <b>Note:</b> Already done taking a bath.
            </p>
            <small class="text-muted"> 2 minutes ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notifications;
