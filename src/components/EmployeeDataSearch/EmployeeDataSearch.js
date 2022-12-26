import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import './EmployeeDataSearch.css';

function EmployeeDataSearch({ data, filterData }) {
  const location = useLocation();
  const [selectedData, setSelectedData] = useState({});
  const [searchParams,setSearchParams] = useSearchParams();


  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    setSelectedData({ ...queryParams });
    handleFilter();
    // eslint-disable-next-line 
  }, [location, data]);

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
    let paramsData = {};
    if (selectedData.LogId) {
      paramsData.LogId = selectedData.LogId;
    }
    if (selectedData.ActionType) {
      paramsData.ActionType = selectedData.ActionType;
    }
    if (selectedData.ApplicationType) {
      paramsData.ApplicationType = selectedData.ApplicationType;
    }
    if (selectedData.fromDate) {
      paramsData.fromDate = selectedData.fromDate;
    }
    if (selectedData.toDate) {
      paramsData.toDate = selectedData.toDate;
    }
    if (selectedData.ApplicationID) {
      paramsData.ApplicationID = selectedData.ApplicationID;
    }
    setSearchParams(paramsData);
  };



  let handleFilter = () => {
    let newData = [...data];
    const queryParams = Object.fromEntries([...searchParams]);;

    const selectedValue = queryParams;

    let actionArray = selectedValue?.ActionType
      ? newData?.filter((item) =>
          item?.actionType?.includes(selectedValue?.ActionType)
        )
      : newData;
    let applicationArray = selectedValue?.ApplicationType
      ? actionArray?.filter(
          (item) => item?.applicationType === selectedValue?.ApplicationType
        )
      : actionArray;
    let dateFromArray = selectedValue?.fromDate
      ? applicationArray?.filter(
          (item) =>
            item?.creationTimestamp.split(" ")[0] >= selectedValue?.fromDate
        )
      : applicationArray;

    let dateToArray = selectedValue?.toDate
      ? dateFromArray?.filter(
          (item) =>
            item?.creationTimestamp.split(" ")[0] <= selectedValue?.toDate
        )
      : dateFromArray;

    let applicationIDArray = selectedValue?.ApplicationID
      ? dateToArray?.filter((item) =>
          item?.applicationId?.toString().includes(selectedValue?.ApplicationID)
        )
      : dateToArray;

    let LogIdArray = selectedValue?.LogId
      ? applicationIDArray?.filter((item) =>
          item?.logId?.toString().includes(selectedValue?.LogId)
        )
      : applicationIDArray;
    filterData(LogIdArray);
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
              setSelectedData({ ...selectedData, LogId: e.target.value })
            }
            aria-label = 'employeeName'
            value={selectedData?.LogId ? selectedData?.LogId : ""}

          />
        </div>
        <div className="table-column">
          <h4>Action type</h4>
          <select 
            onChange={(e) =>
              setSelectedData({ ...selectedData, ActionType: e.target.value })
            }
            value={selectedData?.ActionType ? selectedData?.ActionType : ""}
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
            value={selectedData?.ApplicationType ? selectedData?.ApplicationType : ""}

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
            value={selectedData?.fromDate ? selectedData?.fromDate : ""}

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
            value={selectedData?.toDate ? selectedData?.toDate : ""}

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
            value={selectedData?.ApplicationID ? selectedData?.ApplicationID : ""}

            aria-label = 'applicationId'
          />
        </div>
        <button className="search-button"
          type="submit"
          onClick={handleSearch}
        >
          Search Logger
        </button>
      </div>
    </div>
  );
}

export default EmployeeDataSearch;
