import React from "react";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../type";

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contact: [action.payload, ...state.contact],
        loading: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contact: state.contact.filter(
          (contact) => contact._id !== action.payload
        ),
      };

    case CLEAR_CONTACT:
      return {
        ...state,
        contact: null,
        filtered: null,
        error: null,
        current: null,
      };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case CLEAR_CURRENT:
      return { ...state, current: null };

    case UPDATE_CONTACT:
      return {
        ...state,
        contact: state.contact.map((contact) => {
          return contact._id === action.payload._id ? action.payload : contact;
        }),
        loading: false,
      };

    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contact.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default contactReducer;
