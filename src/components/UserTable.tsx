import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full w-full bg-white table-auto border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Tên</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Số điện thoại</th>
            <th className="p-3 text-left">Địa chỉ</th>
            <th className="p-3 text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${
                    user.status === "Done" ? "bg-green-500 text-white" :
                    user.status === "In progress" ? "bg-yellow-500 text-white" :
                    user.status === "Waiting" ? "bg-orange-500 text-white" :
                    "bg-red-500 text-white"
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-500">
                Chưa có khách hàng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
