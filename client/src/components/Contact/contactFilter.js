import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");
  const { filterContact, filterClear, filtered } = contactContext;

  //   const [search, setSearch] = useState("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const searchContact = (e) => {
    console.log(text);
    if (text.current.value !== "") {
      //   setSearch(e.target.value);
      filterContact(e.target.value);
    } else {
      filterClear();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Find contact..."
        onChange={searchContact}
      />
    </form>
  );
};

export default ContactFilter;
