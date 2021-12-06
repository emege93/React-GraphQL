import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError(`Person not found`);
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <button>Change Phone</button>
      </form>
    </div>
  );
};
