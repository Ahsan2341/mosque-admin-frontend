import React from "react";

function AfterAccept() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Invitation Accepted!
        </h2>
        <p className="text-gray-600 mb-6">
          You can now log in with the email and password sent to your email.
        </p>
      </div>
    </div>
  );
}

export default AfterAccept;
