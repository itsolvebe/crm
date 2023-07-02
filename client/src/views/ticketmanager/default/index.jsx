import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/ticketmanager/default/components/CheckTable";
import ComplexTable from "views/ticketmanager/default/components/ComplexTable";
import DailyTraffic from "views/ticketmanager/default/components/DailyTraffic";
import TaskCard from "views/ticketmanager/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useSelector } from "react-redux";
import { HiUsers } from "react-icons/hi";

const Dashboard = () => {
  const { allTickets } = useSelector((state) => state.ticket);
  const { allUsers } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Tickets"}
          subtitle={allTickets.length}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Open Tickets"}
          subtitle={
            allTickets.filter((ticket) => ticket.status[0] === "Open").length
          }
        />
        <Widget
          icon={<HiUsers className="h-7 w-7" />}
          title={"Registered Users"}
          subtitle={allUsers.length}
        />
      </div>

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
      
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

  

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

  

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />


        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
