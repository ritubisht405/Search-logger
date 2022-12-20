import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";
import './EmployeeDataSearch.css';

function EmployeeDataSearch({ data, filterData }) {
  const [selectedData, setSelectedData] = useState({
  
  });
  const [searchParams, setSearchParams] = useSearchParams();

  let actionTypeOptions = new Set(
    data.map((item) => {
      return item.actionType;
    })
  );

  let applicationTypeOptions = new Set(
    data.map((item) => {
      return item.applicationType;
    })
  );

  const handleSearch = () => {
    setSearchParams(selectedData);
    let newData = [...data];
    let actionArray = selectedData?.ActionType
      ? newData?.filter((item) =>
          item?.actionType?.includes(selectedData?.ActionType)
        )
      : newData;
    let applicationArray = selectedData?.ApplicationType
      ? actionArray?.filter((item) =>
          item?.applicationType?.includes(selectedData?.ApplicationType)
        )
      : actionArray;
    let dateFromArray = selectedData?.fromDate
      ? applicationArray?.filter(
          (item) => item?.creationTimestamp >= selectedData?.fromDate
        )
      : applicationArray;

    let dateToArray = selectedData?.toDate
      ? dateFromArray?.filter(
          (item) => item?.creationTimestamp <= selectedData?.toDate
        )
      : dateFromArray;

    let applicationIDArray = selectedData?.ApplicationID
      ? dateToArray?.filter((item) =>
          item?.applicationId?.toString().includes(selectedData?.ApplicationID)
        )
      : dateToArray;

    filterData(applicationIDArray);
  };

  return (
    <div className="App" data-testid="EmployeeFilterField">
      <div className="table-row">
        <div className="table-column">
          <h4>Employee name</h4>
          <input 
            name='Employee name'
            data-testid ='employeeName'
            type="text"
            placeholder="e.g.Admin User"
            onChange={(e) =>
              setSelectedData({ ...selectedData, name: e.target.value })
            }
            aria-label = 'employeeName'
          />
        </div>
        <div className="table-column">
          <h4>Action type</h4>
          <select 
            onChange={(e) =>
              setSelectedData({ ...selectedData, ActionType: e.target.value })
            }
            aria-label = 'actionTypeSelect'
          >
            <option   value=''>select</option>
            {[...actionTypeOptions].map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        <div className="table-column">
          <h4>Application type</h4>
          <select
            onChange={(e) =>
              setSelectedData({
                ...selectedData,
                ApplicationType: e.target.value,
              })
            }
            aria-label = 'applicationTypeSelect'
          >
           <option   value=''>select</option>
            {[...applicationTypeOptions].map((item, index) =>
              item ? <option key={index}>{item}</option> : ""
            )}
          </select>
        </div>
        <div className="table-column">
          <h4>From Date</h4>
             <input type='date'  onChange={(e) =>
              setSelectedData({ ...selectedData, fromDate: e.target.value })
            } 
            aria-label = 'fromDate'
            name="fromDate"
            />
        </div>
        <div className="table-column">
          <h4>To Date</h4>
            <input type='date'  onChange={(e) =>
              setSelectedData({ ...selectedData, toDate: e.target.value })
            } 
            name="toDate"
            />
        </div>
        <div className="table-column">
          <h4>Application ID</h4>
          <input
            type="text"
            placeholder="application ID"
            onChange={(e) =>
              setSelectedData({
                ...selectedData,
                ApplicationID: e.target.value,
              })
            }
            aria-label = 'applicationId'
          />
        </div>
        <button className="search-button"
          type="submit"
          onClick={handleSearch}
        >
          Search Logger
        </button>

        {/* <button
          style={{
            height: "50px",
            marginTop: "20px",
            marginLeft: "10px",
            background: "blue",
          }}
          data-testid="button"
          type="submit"
          onClick={handleClick}
        >
          Reset
        </button> */}
      </div>
    </div>
  );
}

export default EmployeeDataSearch;
