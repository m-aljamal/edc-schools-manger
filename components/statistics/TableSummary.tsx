import { calculateAvrage } from "../../utils/calculateAvrage";
import { Dropdown } from "antd";
const TableSummary = ({ menu, td, clickedKey }) => {
  return (
    <div className="w-full xl:w-2/4 mb-12 xl:mb-0 px-4 ">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-96 ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base text-gray-900">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a className="ant-dropdown-link">
                {clickedKey.text}
                <i className="fas fa-caret-down mr-2"></i>
              </a>
            </Dropdown>
          </h3>
        </div>
        <div className="block w-full overflow-x-auto ">
          <table className="text-center items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <TableHead data={td.tableHeadext} />
                {td.data[0]?._id[td.type2] && <TableHead data="السبب" />}
                <TableHead data="العدد" />
                <TableHead data="النسبة" />
              </tr>
            </thead>
            <tbody>
              {td.data.map((d, i) => (
                <tr key={i} className="hover:bg-red-200">
                  <TableRow data={d._id[td.type]} />
                  {d._id[td.type2] && <TableRow data={d._id[td.type2]} />}
                  <TableRow data={d.total} />
                  <TableRow data={`% ${calculateAvrage(d.total, td.total)} `} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="mt-auto" />
        <div className="bg-gray-800 text-white text-base pr-4 font-semibold py-1 flex items-center">
          <h3 className="text-white ml-3">العدد الاجمالي</h3>
          <em className="text-lg">{td.total}</em>
        </div>
      </div>
    </div>
  );
};
export default TableSummary;

const TableRow = ({ data }) => {
  return (
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
      {data}
    </th>
  );
};

const TableHead = ({ data }) => (
  <th className=" px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
    {data}
  </th>
);
