import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
    setShowInfo(!showInfo);
  };

  const clearPerson = () => {
    setPerson(null);
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (result.data && showInfo) {
      setPerson(result.data.findPerson);
    }
  }, [result, showInfo]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <p>
          {person.address.street}, {person.address.city}
        </p>
        <p>{person.phone}</p>
        <button onClick={() => clearPerson()}>Close</button>
      </div>
    );
  }

  if (persons === null) return null;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.id} onClick={() => showPerson(person.name)}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  );
};
