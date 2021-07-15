import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./contactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContact, loading } = contactContext;

  useEffect(() => {
    getContact();

    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4> Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    classNames="item"
                    timeout={500}
                  >
                    <>
                      <ContactItem contact={contact} />
                    </>
                  </CSSTransition>
                );
              })
            : contacts.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    classNames="item"
                    timeout={500}
                  >
                    <>
                      <ContactItem contact={contact} />
                    </>
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        "Loading..."
      )}
    </Fragment>
  );
};

export default Contacts;
