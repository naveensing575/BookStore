import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={toggleDropdown}
              type="button"
              className="inline-flex items-center justify-center rounded-full w-10 h-10 focus:outline-none"
              id="user-menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <img
                className="h-10 w-10 rounded-full"
                src={user?.picture}
                alt={user?.name}
              />
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <p className="block px-4 py-2 text-sm text-gray-700">
                  {user?.name}
                </p>
                <p className="block px-4 py-2 text-sm text-gray-700">
                  {user?.email}
                </p>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
