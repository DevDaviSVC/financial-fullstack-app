import DashboardItem from "./DashboardItem";

const DashboardList = ({adminList, dashboards}) => {
  const title = adminList ? "Dashboards which you are Admin" : "All dashboards";
  const bgColor = adminList ? "bg-blue-800" : "bg-blue-950";

    return (
      <div className={`${bgColor} p-8 rounded-xl mb-8 shadow-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30`}>
        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
        <div className="">
          <DashboardItem />
          <DashboardItem />
          <DashboardItem />
        </div>
      </div>
    )
};

export default DashboardList;