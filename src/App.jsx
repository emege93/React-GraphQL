import { useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";
import { Notify } from "./Notify";
import { PhoneForm } from "./PhoneForm";

function App() {
  const { data, loading, error } = usePersons();
  const [errorMessage, setErrorMessage] = useState(null);

  if (error) return <span style="color: red">{error}</span>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <p>GraphQL + React!</p>
            <Persons persons={data?.allPersons} />
          </>
        )}
        <PersonForm notifyError={notifyError} />
        <PhoneForm notifyError={notifyError} />
      </header>
    </div>
  );
}

export default App;
