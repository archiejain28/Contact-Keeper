import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const Contactform = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, current, updateContact } = contactContext;

  const [contact, setcontact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null) {
      setcontact(current);
    } else {
      setcontact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current, contactContext]);

  const onChange = (e) => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  const clearAll = () => {
    clearCurrent();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const { name, email, phone, type } = contact;

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="Email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <p> Contact Type</p>
      <input
        type="radio"
        id="personal"
        name="type"
        value="personal"
        onChecked={type}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        id="professional"
        name="type"
        value="professional"
        onChecked={type}
        onChange={onChange}
      />
      Professional
      <input
        type="submit"
        value={current ? "Update Contact" : "Add Contact"}
        className="btn btn-primary btn-block"
      />
      {current && (
        <input
          type="submit"
          value="Clear"
          className="btn btn-light btn-block"
          onClick={clearAll}
        />
      )}
    </form>
  );
};

export default Contactform;
