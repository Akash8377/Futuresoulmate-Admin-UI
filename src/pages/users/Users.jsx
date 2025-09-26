import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { fetchAllUsers } from "./slice/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setHeadingTitle } from "../../reducers/HeadingSlice/headingSlice";
import UserProfileModal from "./UserProfileModal";
import { camelCaseToNormalText } from "../../lib/helpers/helperFunctions";

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(setHeadingTitle("Users"));
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // 🔄 Auto filter whenever searchTerm, genderFilter, or users change
  useEffect(() => {
    let filtered = users || [];

    // 🔍 Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.user_id.toString().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.phone.includes(searchTerm) ||
          user.last_name.toLowerCase().includes(searchLower) ||
          user.first_name.toLowerCase().includes(searchLower)
      );
    }

    // 🚻 Gender filter
    if (genderFilter) {
      filtered = filtered.filter(
        (user) => user.gender?.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, genderFilter, users]);

  function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.toString().replace(/\D/g, "");
    if (cleaned.length >= 10) {
      const phone = cleaned.slice(-10);
      const code = cleaned.length > 10 ? "+" + cleaned.slice(0, -10) : "+91";
      if (code === "+91") {
        return `${code} ${phone.slice(0, 5)} ${phone.slice(5)}`;
      } else if (code === "+1") {
        return `${code} (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
      } else {
        return `${code} ${phone}`;
      }
    }
    return phoneNumber;
  }

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col items-center text-black">
      <div className="w-full mb-4 flex flex-col sm:flex-row gap-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name, Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded bg-white text-black"
        />

        {/* Gender Dropdown */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="p-2 border rounded bg-white text-black"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="mt-6 text-center">
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="mt-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      ) : filteredUsers && filteredUsers.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="p-2 border border-gray-300">S. No</th>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Phone No</th>
                <th className="p-2 border border-gray-300">Gender</th>
                <th className="p-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-200">
                  <td className="p-2 border border-gray-300 text-center">{user.user_id}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-2 border border-gray-300 break-all">{user.email}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    {formatPhoneNumber(user.phone)}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {camelCaseToNormalText(user.gender) || "-"}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-2xl"
                      onClick={() => handleView(user)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p>No User found matching your search criteria.</p>
        </div>
      )}

      <UserProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;