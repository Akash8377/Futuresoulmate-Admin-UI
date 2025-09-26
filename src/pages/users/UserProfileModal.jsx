import React from "react";
import Modal from "../../components/common/modal/Modal";
import config from "../../config";
import { formatPhoneNumber } from "../../lib/helpers/helperFunctions";

const UserProfileModal = ({ isOpen, onClose, user, theme }) => {
  if (!user) return null;

  // Helper function to parse JSON fields safely
  const parseField = (field) => {
    if (!field) return null;
    try {
      return typeof field === "string" ? JSON.parse(field) : field;
    } catch (e) {
      return field;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Parse JSON fields
  const hobbies = parseField(user.hobbies) || [];
  const familyDetails = parseField(user.family_details) || {};
  const partnerPreference = parseField(user.partner_preference) || {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${user.first_name} ${user.last_name}'s Profile`}
      theme={theme}
      size="large"
    >
      <div className={`space-y-6 p-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          {user.profile_image && (
            <img 
              src={`${config.imageURL}/${user.profile_image}`} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-500">{user.profileId}</p>
            <p className="text-gray-500">{user.looking_for}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Basic Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Gender:</span> {user.gender || "N/A"}</p>
              <p><span className="font-medium">Date of Birth:</span> {formatDate(user.dob)}</p>
              <p><span className="font-medium">Age:</span> {user.birth_year ? new Date().getFullYear() - parseInt(user.birth_year) : "N/A"}</p>
              <p><span className="font-medium">Marital Status:</span> {user.marital_status || "N/A"}</p>
              <p><span className="font-medium">Height:</span> {user.height || "N/A"}</p>
              <p><span className="font-medium">Religion:</span> {user.religion || "N/A"}</p>
              <p><span className="font-medium">Mother Tongue:</span> {user.mother_tongue || "N/A"}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {user.email || "N/A"}</p>
              <p><span className="font-medium">Phone:</span> {formatPhoneNumber(user.phone)}</p>
              <p><span className="font-medium">Location:</span> {user.city}, {user.country}</p>
              <p><span className="font-medium">Living In:</span> {user.living_in || "N/A"}</p>
              <p><span className="font-medium">Culture:</span> {user.culture || "N/A"}</p>
            </div>
          </div>

          {/* Education & Career */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Education & Career</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Education:</span> {user.education || "N/A"}</p>
              <p><span className="font-medium">Qualification:</span> {user.qualification || "N/A"}</p>
              <p><span className="font-medium">College:</span> {user.college || "N/A"}</p>
              <p><span className="font-medium">Profession:</span> {user.profession || "N/A"}</p>
              <p><span className="font-medium">Employer:</span> {user.employer || "N/A"}</p>
              <p><span className="font-medium">Income:</span> {user.income ? `${user.income} per ${user.incomePer}` : "N/A"}</p>
              <p><span className="font-medium">Work Type:</span> {user.work_type || "N/A"}</p>
            </div>
          </div>

          {/* Family Details */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Family Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Father:</span> {familyDetails.father || "N/A"}</p>
              <p><span className="font-medium">Mother:</span> {familyDetails.mother || "N/A"}</p>
              <p><span className="font-medium">Brothers:</span> {familyDetails.brothers || "0"}</p>
              <p><span className="font-medium">Sisters:</span> {familyDetails.sisters || "0"}</p>
              <p><span className="font-medium">Financial Status:</span> {user.financial_status || "N/A"}</p>
              <p><span className="font-medium">Lives with Family:</span> {user.lives_with_family ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Lifestyle */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Lifestyle</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Diet:</span> {user.diet || "N/A"}</p>
              <p><span className="font-medium">Hobbies:</span> {hobbies.length > 0 ? hobbies.join(", ") : "N/A"}</p>
              <p><span className="font-medium">Profile Description:</span> {user.profile_description || "N/A"}</p>
            </div>
          </div>

          {/* Health & Astrological Information */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Health & Astrological Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Blood Group:</span> {user.blood_group || "N/A"}</p>
              <p><span className="font-medium">Health Info:</span> {user.health_info || "N/A"}</p>
              <p><span className="font-medium">Disability:</span> {user.disability || "N/A"}</p>
              <p><span className="font-medium">Manglik:</span> {user.manglik || "N/A"}</p>
              <p><span className="font-medium">Nakshatra:</span> {user.nakshatra || "N/A"}</p>
              <p><span className="font-medium">Rashi:</span> {user.rashi || "N/A"}</p>
              <p><span className="font-medium">Birth Time:</span> {user.birth_time || "N/A"}</p>
              <p><span className="font-medium">Birth City:</span> {user.birth_city || "N/A"}</p>
            </div>
          </div>

          {/* Partner Preference */}
          {partnerPreference && Object.keys(partnerPreference).length > 0 && (
            <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className="font-semibold text-lg mb-3 border-b pb-2">Partner Preference</h3>
              <div className="space-y-3">
                {partnerPreference.basic && (
                  <div>
                    <h4 className="font-medium">Basic</h4>
                    <p>Age: {partnerPreference.basic.ageRange || "N/A"}</p>
                    <p>Height: {partnerPreference.basic.heightRange || "N/A"}</p>
                    <p>Marital Status: {partnerPreference.basic.maritalStatus || "N/A"}</p>
                  </div>
                )}
                
                {partnerPreference.culture && (
                  <div>
                    <h4 className="font-medium">Culture</h4>
                    <p>Religion: {partnerPreference.culture.religion || "N/A"}</p>
                    <p>Culture: {partnerPreference.culture.culture || "N/A"}</p>
                    <p>Language: {partnerPreference.culture.language || "N/A"}</p>
                  </div>
                )}
                
                {partnerPreference.education && (
                  <div>
                    <h4 className="font-medium">Education & Career</h4>
                    <p>Qualification: {partnerPreference.education.qualification || "N/A"}</p>
                    <p>Profession: {partnerPreference.education.profession || "N/A"}</p>
                    <p>Annual Income: {partnerPreference.education.annualIncome || "N/A"}</p>
                  </div>
                )}
                
                {partnerPreference.location && (
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>Country: {partnerPreference.location.country || "N/A"}</p>
                    <p>State: {partnerPreference.location.state || "N/A"}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Account Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Status:</span> {user.status || "N/A"}</p>
              <p><span className="font-medium">Email Verified:</span> {user.email_verified ? "Yes" : "No"}</p>
              <p><span className="font-medium">Phone Verified:</span> {user.phone_verified ? "Yes" : "No"}</p>
              <p><span className="font-medium">Verified Profile:</span> {user.verified ? "Yes" : "No"}</p>
              <p><span className="font-medium">Created At:</span> {formatDate(user.created_at)}</p>
              <p><span className="font-medium">Last Updated:</span> {formatDate(user.updated_at)}</p>
              <p><span className="font-medium">Last Online:</span> {formatDate(user.online_status)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;