const DashboardCard = ({ title, count, icon, mode }) => {
    return (
      <div className="p-4 size-[12rem] cursor-pointer">
        <div
          className={`border px-4 py-3 rounded-xl ${mode === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#b8e2f2] hover:bg-[#96d5ea]'} border-[#6ecff6]`}
        >
          <div className="text-[#387a94] w-12 h-12 mb-3 inline-block">{icon}</div>
          <h2 className="title-font font-medium text-3xl text-[#387a94] fonts1">{count}</h2>
          <p className="text-[#387a94] font-bold">{title}</p>
        </div>
      </div>
    );
  };

  export default DashboardCard