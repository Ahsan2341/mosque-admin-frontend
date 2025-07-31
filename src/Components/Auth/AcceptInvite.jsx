import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function AcceptInvite() {
  const [searchParams] = useSearchParams();
  //   const token = searchParams.get("token"); // Get token from query string
  const { token } = useParams();
  const name = searchParams.get("name"); // Get name from query string
  const [message, setMessage] = useState("Processing your invitation...");
  const [isLoading, setIsLoading] = useState(true);

  const acceptInvite = async () => {
    if (!token || !name) {
      setMessage("Invalid invitation link. Missing token or name.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/accept-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Invitation accepted successfully!");
      } else {
        setMessage(result.message || "Failed to accept invitation.");
      }
      window.location.assign(
        "https://mosque-admin-frontend-two.vercel.app/auth/invite-accepted"
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          Accept Mosque Admin Invitation
        </h1>

        <button
          onClick={acceptInvite}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Accept Invite
        </button>
      </div>
    </div>
  );
}

export default AcceptInvite;
