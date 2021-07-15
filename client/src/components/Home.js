import React, { useContext, useEffect } from "react";
import Contacts from "./Contact/contacts.js";
import Contactform from "./Contact/Contactform.js";
import ContactFilter from "./Contact/contactFilter";
import AuthContext from "../context/auth/authContext.js";
const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <Contactform />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
