import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    loginWithRedirect();
    navigate("/home");
  };

  return (
    <div
      className="flex justify-end items-center h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "monospace",
      }}
    >
      <div className="flex flex-col items-end p-8">
        <h1 className="text-3xl font-bold mb-4 text-white text-shadow-black">
          Welcome to Book-Store
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          onClick={handleLoginClick}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
