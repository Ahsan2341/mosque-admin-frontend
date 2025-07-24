import React, { useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import AuthAPI from "../../api/auth/auth";
import { useSelector } from "react-redux";
function Settings() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("inside effect");
    if (currentUser) {
      AuthAPI.fetchUser(currentUser.id).then((response) => {
        console.log("---------------");
        console.log(response.data);
        setUser(response.data.data[0]);
      });
    }
  }, []);

  return (
    <MainLayout>
      {user ? (
        <>
          <ProfileSettings user={user} />
          <PasswordSettings />
        </>
      ) : null}
    </MainLayout>
  );
}

export default Settings;
