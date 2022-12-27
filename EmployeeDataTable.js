import React, { useEffect, useState} from "react";
import EmployeeDataSearch from "../EmployeeDataSearch/EmployeeDataSearch";
import Pagination from "../Pagination/Pagination";
import "./EmployeeDataTable.css";


function EmployeeDataTable() {
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [, setTotalRecord] = useState(0);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  let [sortToggle, setSortToggle] = useState({
    isLogId: true,
    isApplicationType: true,
    isApplicationId: true,
    isActionType: true,
    isDateAndTime: true,
  });

  const nPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f").then(
      (result) => {
        result
          .json()
          .then((response) => {
            setData(response?.result?.auditLog);
            setDataCopy(response?.result?.auditLog);
            setTotalRecord(response?.result?.auditLog?.length)
          })
          .catch(() => "something went wrong");
      }
    );
  }, []);



  const LogIdSorting = () => {
    let isSort = sortToggle.isLogId;
    let newData = [...data];
    let sorting = (a, b) => {
      if (isSort) {
        return a.logId - b.logId
      } else {
        return b.logId - a.logId
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
    setSortToggle({
      ...sortToggle,
      isLogId: !sortToggle.isLogId,
    });
  };



  const ApplicationIdSorting = () => {
    let isSort = sortToggle.isApplicationId;
    let newData = [...data];
    let sorting = (a, b) => {
      if (isSort) {
        return a.applicationId - b.applicationId
      } else {
        return b.applicationId - a.applicationId
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
    setSortToggle({
      ...sortToggle,
      isApplicationId: !sortToggle.isApplicationId,
    });
  };



  const ApplicationTypeSorting = () => {
    let isSort = sortToggle.isApplicationType;
    let newData = [...data];
    let sorting = (a, b) => {
      if (isSort) {
        return a.applicationType?.localeCompare(b.applicationType)
      } else {
        return b.applicationType?.localeCompare(a.applicationType)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
    setSortToggle({
      ...sortToggle,
      isApplicationType: !sortToggle.isApplicationType,
    });
  };


  const ActionTypeSorting = () => {
    let isSort = sortToggle.isActionType;
   let newData = [...data];
    let sorting = (a, b) => {
      if (isSort) {
        return a.actionType?.localeCompare(b.actionType)
      } else {
        return b.actionType?.localeCompare(a.actionType)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
    setSortToggle({
      ...sortToggle,
      isActionType: !sortToggle.isActionType,
    });
  };


  const DateAndTimeSorting = () => {
    let isSort = sortToggle.isDateAndTime;
    let newData = [...data];
    let sorting = (a, b) => {
      if (isSort) {
        return a.creationTimestamp?.localeCompare(b.creationTimestamp)
      } else {
        return b.creationTimestamp?.localeCompare(a.creationTimestamp)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
    setSortToggle({
      ...sortToggle,
      isDateAndTime: !sortToggle.isDateAndTime,
    });

  }


  const filterData = (newData) => {
    setData(newData);
    setCurrentPage(1);
  };

  return (
    <div className="App" data-testid="EmployeeTable">
      <EmployeeDataSearch data={dataCopy} filterData={filterData} />
      <table>
        <thead>
          <tr>
            <th onClick={LogIdSorting}>Log ID 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sortToggle.isLogId ? '-135deg' : '45deg'})`
            }}></i></th>


            <th onClick={ApplicationTypeSorting}>Application Type 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sortToggle.isApplicationType  ? '-135deg' : '45deg'})`
            }}></i> </th>


            <th onClick={ApplicationIdSorting}>Application ID 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sortToggle.isApplicationId ? '-135deg' : '45deg'})`
            }}></i></th>


            <th onClick={ActionTypeSorting}>Action 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sortToggle.isActionType ? '-135deg' : '45deg'})`
            }}></i></th>


            <th>Action Details</th>
            <th onClick={DateAndTimeSorting}>Date:Time 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sortToggle.isDateAndTime ? '-135deg' : '45deg'})`
            }}></i></th>
          </tr>
        </thead>

        <tbody>
          
            { currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.logId}</td>
                <td>{item.applicationType ? item.applicationType : '-'}</td>
                <td>{item.applicationId ? item.applicationId : '-'}</td>
                <td>{item.actionType}</td>
                <td>-</td>
                <td>{item.creationTimestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!data.length && <center><h4>Data not found!</h4></center>}
    
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />


    </div>
  );
}

export default EmployeeDataTable;
