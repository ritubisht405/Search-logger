import React from "react";
import EmployeeDataTable from "./components/EmployeeDataTable/EmployeeDataTable";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        < EmployeeDataTable/>
      </BrowserRouter>
    </div>
  );
}

export default App;
