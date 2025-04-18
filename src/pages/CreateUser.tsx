import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "hooks";
import { UserData } from "../constants";

const CreateUser = () => {
  const navigate = useNavigate();
  const { statuses, addStatus, removeStatus } = useUserStatus()
  const [newStatus, setNewStatus] = useState<string>()
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [additionalFields, setAdditionalFields] = useState<
    { label: string; value: string }[]
  >([]);

  // Basic form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [request, setRequest] = useState("");
  const [email, setEmail] = useState("");

  const handleAddStatus = () => {
    if (newStatus) {
      // Get the existing statuses from localStorage or initialize with an empty array

      // Add the new status if it doesn't already exist in the array
      if (!statuses.includes(newStatus)) {
        addStatus(newStatus);
      }
    }

    // Optionally, reset the input field
    setNewStatus("");
  };


  const handleAddField = () => {
    const label = prompt("Nhập tên thông tin");
    if (label && label.trim() !== "") {
      setAdditionalFields([...additionalFields, { label: label.trim(), value: "" }]);
    }
  };

  const handleFieldChange = (
    index: number,
    key: "value",
    newValue: string
  ) => {
    const updatedFields = [...additionalFields];
    updatedFields[index][key] = newValue;
    setAdditionalFields(updatedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      address,
      phone,
      profile,
      request,
      status: selectedStatus,
      additionalFields,
    };

    // Save back to localStorage
    UserData.add(newUser)

    alert("Lưu thành công!");

    // Optional: reset the form
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setProfile("");
    setRequest("");
    setSelectedStatus(statuses[0]);
    setAdditionalFields([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <div
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 my-6 cursor-pointer w-fit"
      >
        Quay lại trang chủ
      </div>

      <h2 className="text-2xl font-semibold mb-4">Tạo khách hàng mới</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Tên</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            type="tel"
            className="w-full border px-4 py-2 rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hồ sơ</label>
          <textarea
            className="w-full border px-4 py-2 rounded-md"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Yêu cầu khách hàng</label>
          <textarea
            className="w-full border px-4 py-2 rounded-md"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tình trạng xử lý</label>

          {/* Status dropdown */}
          <select
            className="w-full border px-4 py-2 rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) =>
              !status.includes("Tất cả") && (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>

          {/* Add new status */}
          <div className="flex items-center mt-2 gap-2">
            <input
              type="text"
              placeholder="Thêm trạng thái"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border px-3 py-1 rounded-md flex-1"
            />
            <button
              type="button"
              onClick={handleAddStatus}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Thêm
            </button>
          </div>

          {/* Status list with remove buttons */}
          <div className="mt-3 space-y-1">
            {statuses.map((status) => (
              !status.includes("Tất cả") && <div key={status} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-gray-200 text-sm">{status}</span>
                <button
                  type="button"
                  onClick={() => {
                    removeStatus(status)

                    if (selectedStatus === status) {
                      setSelectedStatus("");
                    }
                  }}
                  className="text-red-500 text-sm hover:underline"
                >
                  Xoá
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Fields */}
        <div className="space-y-4">
          {additionalFields.map((field, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{field.label}</label>
              <textarea
                className="w-full border px-4 py-2 rounded-md"
                placeholder={field.label}
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddField}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            + Thêm thông tin
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
