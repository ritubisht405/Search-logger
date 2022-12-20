import React, { useEffect, useState, useCallback } from "react";
import EmployeeDataSearch from "../EmployeeDataSearch/EmployeeDataSearch";
import Pagination from "../Pagination/Pagination";
import "./EmployeeDataTable.css";


function EmployeeDataTable() {
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const [sort, setSort] = useState(0);
  const [appSort, setAppSort] = useState(0);
  const [appIdSort, setAppIdSort] = useState(0);
  const [dateSort, setDateSort] = useState(0);
  const [actionTypeSort, setActionTypeSort] = useState(0);


  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );


  useEffect(() => {
    fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f").then(
      (result) => {
        result
          .json()
          .then((response) => {
            setData(response.result.auditLog);
            setDataCopy(response.result.auditLog);
            setTotalRecord(response.result.auditLog.length)
          })
          .catch(() => "something went wrong");
      }
    );
  }, []);

  // LogId Sorting 

  const LogIdSorting = (sort) => {
    let newData = [...data];
    let sorting = (a, b) => {
      if (sort) {
        return a.logId - b.logId
      } else {
        return b.logId - a.logId
      }
    }
    let sortedData = newData.sort(sorting);
    console.log('sortedData==>', sortedData)
    setData(sortedData);
  };


  useEffect(() => {
    LogIdSorting(sort)
  }, [sort])

  //Application Id Sorting

  const ApplicationIdSorting = (sort) => {
    let newData = [...data];
    let sorting = (a, b) => {
      if (sort) {
        return a.applicationId - b.applicationId
      } else {
        return b.applicationId - a.applicationId
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
  };


  useEffect(()=>{
    ApplicationIdSorting(appIdSort)
  },[appIdSort])



  //ApplicationType Sorting


  const ApplicationTypeSorting = (sort) => {
    let newData = [...data];
    let sorting = (a, b) => {
      if (sort) {
        return a.actionType?.localeCompare(b.actionType)
      } else {
        return b.actionType?.localeCompare(a.actionType)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
  };


  useEffect(()=>{
    ApplicationTypeSorting(actionTypeSort)
  },[actionTypeSort])


  //ActionType Sorting

  const ActionTypeSorting = () => {
   let newData = [...data];
    let sorting = (a, b) => {
      if (sort) {
        return a.applicationType?.localeCompare(b.applicationType)
      } else {
        return b.applicationType?.localeCompare(a.applicationType)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);
  };


  useEffect(()=>{
    ApplicationTypeSorting(appSort)
  },[appSort])

  //Date and Time Sorting

  const DateAndTimeSorting = (sort) => {
    let newData = [...data];
    let sorting = (a, b) => {
      if (sort) {
        return a.creationTimestamp?.localeCompare(b.creationTimestamp)
      } else {
        return b.creationTimestamp?.localeCompare(a.creationTimestamp)
      }
    }
    let sortedData = newData.sort(sorting);
    setData(sortedData);

  }

  useEffect(()=>{
    DateAndTimeSorting(dateSort)
  },[dateSort])


  // after click on button for filter pagination move to page 1

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
            <th onClick={() => setSort(prevSort => !prevSort)}>Log ID 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${sort ? '-135deg' : '45deg'})`
            }}></i></th>


            <th onClick={()=>setAppSort(prevAppSort=>!prevAppSort)}>Application Type 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${appSort ? '-135deg' : '45deg'})`
            }}></i> </th>


            <th onClick={()=>setAppIdSort(prevAppIdSort=>!prevAppIdSort)}>Application ID 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${appIdSort ? '-135deg' : '45deg'})`
            }}></i></th>


            <th onClick={()=>setActionTypeSort(prevActionTypeSort=>!prevActionTypeSort)}>Action 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${actionTypeSort ? '-135deg' : '45deg'})`
            }}></i></th>


            <th>Action Details</th>
            <th onClick={()=>setDateSort(prevDateSort =>!prevDateSort)}>Date:Time 
              <i style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              marginLeft:'10px',
              transform: `rotate(${dateSort ? '-135deg' : '45deg'})`
            }}></i></th>
          </tr>
        </thead>

        <tbody>
          {data
            ? currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.logId}</td>
                <td>{item.applicationType ? item.applicationType : '-'}</td>
                <td>{item.applicationId ? item.applicationId : '-'}</td>
                <td>{item.actionType}</td>
                <td>-</td>
                <td>{item.creationTimestamp}</td>
              </tr>
            ))
            : "No Data Matched"}
        </tbody>
      </table>
    
      <Pagination
        totalRecords={100}
        pageLimit={10}
        pageNeighbours={2}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />


    </div>
  );
}

export default EmployeeDataTable;
