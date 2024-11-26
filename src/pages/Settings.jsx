import React from "react";
import Side from "./dashboard/side";
import { IoArchiveSharp } from "react-icons/io5";

const Settings = () => {
  return (
    <div>
      <Side />

      <a href="/accounts" className="ownertext">
        <img src="adminriza.png" className="owner"></img>
        Owner
      </a>

      <a href="/" className="archivetext">
        <img src="archives.png" className="archive"></img>
        Archives
      </a>

      <a href="/Logs" className="logstext">
        <img src="folder.png" className="logsimg"></img>
        Logs
      </a>
    </div>
  );
};

export default Settings;
