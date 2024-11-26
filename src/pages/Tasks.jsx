import Side from "./dashboard/side";
import Upnav from "./dashboard/upnav";
import Adl from "./activity/adl";
import { FaTasks } from "react-icons/fa";
import Assigned from "./activity/assigned";
import Notes from "./activity/notes";
import Createaccount from "./activity/createAccounts";
import Pie from "./activity/pie";
import Taskassign from "./activity/taskassign";

const Tasks = () => {
  return (
    <div>
      <Side />
      <Upnav />
      <div className="acon">
        <FaTasks className="img" />
        <p className="dash">Tasks</p>
      </div>

      <Taskassign />

      <Adl />
      <Notes />
      <Pie />
      <Createaccount />
    </div>
  );
};

export default Tasks;
/**
 */
