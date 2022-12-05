import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Filter from "./Filter.js";
import "./filterdata.css";
import { useLocation } from "react-router-dom";
import Arrow from "./images/up-arrow.png"
// import Table from 'react-bootstrap/Table';

const Loggertable = () => {
  
  const [apiData, setApiData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHolder, setDataHolder] = useState([]);
  const [totalDataFilter, setTotalDataFilter] = useState([]);
  const [tableOrder, setTableOrder] = useState(false);
  const [flag, setflag] = useState({
  user: false,
  });

  const location = useLocation();
  useEffect(() => {
   
    if( apiData.length==0){
      fetchData();
    }
    // fetchData();
  }, [apiData]);
 
  const fetchData = async () => {
    await axios
      .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => {
        setApiData(res.data.result.auditLog);
        setTotalData(res.data.result.auditLog);
        setTotalDataFilter(res.data.result.auditLog);
        setDataHolder(res.data.result.auditLog);
        setTotalPages(
          Array.from(
            { length: Math.ceil(res.data.result.auditLog.length / 10) },
            (v, i) => i + 1
          )
        );
       
        getCount(1, res.data.result.auditLog);
      
const updatedData = res.data.result.auditLog;
if(updatedData && window.location.search){
 
  let temp = window.location.search;
  let tempNew = temp.split('?').join(' ');
  let tempSeperate = tempNew.trim().split(' ');
 
  if(tempSeperate.length > 0){
    let objectData = {};
    let actionTypeVar = '';
    let applicationTypeVar = '';
    let applicationIdVar = '';
    let startDateVar = '';
    let endDateVar = ''
    for(var i = 0;  i < tempSeperate.length; i++){
      if(tempSeperate[i].includes('actionType')){
        actionTypeVar = tempSeperate[i].split('=')[1]
      }
      if(tempSeperate[i].includes('applicationType')){
        applicationTypeVar = tempSeperate[i].split('=')[1]
      }  
      if(tempSeperate[i].includes('applicationId')){
        applicationIdVar = tempSeperate[i].split('=')[1]
      }
      if(tempSeperate[i].includes('startDate')){
        let startEndDate = ''
        startEndDate = tempSeperate[i].split('=')[1];
        startDateVar = startEndDate.split(',')[0];
        endDateVar = startEndDate.split(',')[1]
      }
    } 
console.log("onresfesh--", actionTypeVar, applicationTypeVar, applicationIdVar, startDateVar, endDateVar);
let actionTypefiltereData = [];
let applicationTypeFilterData = [];
let actionapplicationTypeFilterData = [];
let applicationIdVarfilterData = [];
let actionapplicationIdVarfilterData = [];
let applicationTypeapplicationIdVarfilterData = [];
let startEndDateFilterVar = [];
if(actionTypeVar){
  updatedData.filter((item) => {
    if(item.actionType == actionTypeVar){
     
      actionTypefiltereData.push(item);
     
      setTotalData(actionTypefiltereData);
      setApiData(actionTypefiltereData);
      setTotalPages(
        Array.from({ length: Math.ceil(actionTypefiltereData.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, actionTypefiltereData);
    
    }
  })
  if(actionTypeVar && applicationTypeVar){
    updatedData.filter((item) => {
      if((item.actionType == actionTypeVar) && (item.applicationType == applicationTypeVar)){
       
        actionapplicationTypeFilterData.push(item);
        
        setTotalData(actionapplicationTypeFilterData);
        setApiData(actionapplicationTypeFilterData);
        setTotalPages(
          Array.from({ length: Math.ceil(actionapplicationTypeFilterData.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, actionapplicationTypeFilterData);
      }
    })
  }
  if(actionTypeVar && applicationTypeVar && applicationIdVarfilterData){
    updatedData.filter((item) => {
      if((item.actionType == actionTypeVar) && (item.applicationType == applicationTypeVar) && (item.applicationId == applicationIdVar)){
        
        actionapplicationIdVarfilterData.push(item);
       
        setTotalData(actionapplicationIdVarfilterData);
        setApiData(actionapplicationIdVarfilterData);
        setTotalPages(
          Array.from({ length: Math.ceil(actionapplicationIdVarfilterData.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, actionapplicationIdVarfilterData);
      }
    })
  }
}

else if(applicationTypeVar){
  if(applicationTypeFilterData.length > 0){
    return false
  }
  if(actionapplicationIdVarfilterData.length > 0){
    return false
  }
  else{
    if(applicationTypeVar && applicationIdVar){
      updatedData.filter((item) => {
        if((item.applicationType == applicationTypeVar) && (item.applicationId == applicationIdVar)){
         
          applicationTypeFilterData.push(item);
         
          setTotalData(applicationTypeFilterData);
        setApiData(applicationTypeFilterData);
        setTotalPages(
          Array.from({ length: Math.ceil(applicationTypeFilterData.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, applicationTypeFilterData);
        }
      })
    }else{
      updatedData.filter((item) => {
        if(item.applicationType == applicationTypeVar){
          
          applicationTypeFilterData.push(item);
          
          setTotalData(applicationTypeFilterData);
        setApiData(applicationTypeFilterData);
        setTotalPages(
          Array.from({ length: Math.ceil(applicationTypeFilterData.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, applicationTypeFilterData);
        }
      })
    }
   
  }

}
else if (applicationIdVar){
  updatedData.filter((item) => {
    if(item.applicationId == applicationIdVar){

      applicationIdVarfilterData.push(item);
     
      setTotalData(applicationIdVarfilterData);
        setApiData(applicationIdVarfilterData);
        setTotalPages(
          Array.from({ length: Math.ceil(applicationIdVarfilterData.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, applicationIdVarfilterData);
    }
  })
}
else if (startDateVar && endDateVar){
  updatedData.filter((item) => {
    let temp = new Date(item.creationTimestamp).getTime();
    if(startDateVar >= temp &&  temp <= endDateVar){
     
      startEndDateFilterVar.push(item);
      
      setTotalData(startEndDateFilterVar);
        setApiData(startEndDateFilterVar);
        setTotalPages(
          Array.from({ length: Math.ceil(startEndDateFilterVar.length / 10) }, (v, i) => i + 1)
        );
        getCount(1, startEndDateFilterVar);
    }
  })
}
    // for(var i = 0; i< updatedData.length; i++){
    //   console.log('dataNew', updatedData[i].actionType.includes(tempSeperate[i]))
    //   if((updatedData[i].actionType.includes(tempSeperate[i])) && (updatedData[i].applicationType.includes(tempSeperate[i]))){
    //     console.log('filterfirst', updatedData)
    //   }
    // }
  
  }
}

       
      })
      .catch((err) => {
        //toast.error(err.response.error);
      });
  };
  
  
const filterCombine = (e) =>{
let tableData = totalDataFilter;
let collectedData = e;

let filterNewData = [];
if(e){
  tableData.filter((item) => {
    if((collectedData[0].actionType == null && collectedData[0].applicationType == null && collectedData[0].applicationId!== null) || (collectedData[0].actionType !== null && collectedData[0].applicationType !== null && collectedData[0].applicationId!== null)){
     
  if(collectedData[0].applicationId!==null){
    
         if(item.applicationId == collectedData[0].applicationId){
       
        filterNewData.push(item);

              setTotalData(filterNewData);
          setApiData(filterNewData);
          setTotalPages(
            Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
          );
          getCount(1, filterNewData);
  }
  }
  else if (collectedData[0].actionType && collectedData[0].applicationType && collectedData[0].applicationId){
   
    if((item.actionType == collectedData[0].actionType) && (item.applicationType == collectedData[0].applicationType) && (item.applicationId == collectedData[0].applicationId)){
     filterNewData.push(item);
    
           setTotalData(filterNewData);
       setApiData(filterNewData);
       setTotalPages(
         Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
       );
       getCount(1, filterNewData);
   }
  }

    }
   else if((collectedData[0].applicationType == null) || (collectedData[0].applicationType == "Select Application Types")){
      if((item.actionType == collectedData[0].actionType)){
        filterNewData.push(item);
       
              setTotalData(filterNewData);
          setApiData(filterNewData);
          setTotalPages(
            Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
          );
          getCount(1, filterNewData);
      }
      if( collectedData[0].actionType &&  (collectedData[0].startDate && collectedData[0].endDate)){

        const start = new Date(collectedData[0].startDate).getTime();
        const end = new Date(collectedData[0].endDate).getTime();

        const temp = new Date(item.creationTimestamp).getTime();   
        if ((item.actionType == collectedData[0].actionType) && (temp >= start && temp <= end)) {
               
                filterNewData.push(item);
              
                      setTotalData(filterNewData);
                  setApiData(filterNewData);
                  setTotalPages(
                    Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
                  );
                  getCount(1, filterNewData);
                
              }
      }
    }
    else if ((collectedData[0].actionType == null) || (collectedData[0].actionType == "Select Action Types")){
      if((item.applicationType == collectedData[0].applicationType)){
        filterNewData.push(item);

              setTotalData(filterNewData);
          setApiData(filterNewData);
          setTotalPages(
            Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
          );
          getCount(1, filterNewData);
      }
      if( collectedData[0].applicationType &&  (collectedData[0].startDate && collectedData[0].endDate)){

        const start = new Date(collectedData[0].startDate).getTime();
        const end = new Date(collectedData[0].endDate).getTime();
       
        const temp = new Date(item.creationTimestamp).getTime();   
        if ((item.applicationType == collectedData[0].applicationType) && (temp >= start && temp <= end)) {
              
                filterNewData.push(item);

                      setTotalData(filterNewData);
                  setApiData(filterNewData);
                  setTotalPages(
                    Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
                  );
                  getCount(1, filterNewData);
                
              }
      }
    }
    else if ((collectedData[0].actionType!=="Select Action Types" || collectedData[0].actionType!== null) && (collectedData[0].applicationType!=="Select Application Types" || collectedData[0].applicationType!==null)){
      if((item.actionType == collectedData[0].actionType) && (item.applicationType == collectedData[0].applicationType)){
        filterNewData.push(item);

              setTotalData(filterNewData);
          setApiData(filterNewData);
          setTotalPages(
            Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
          );
          getCount(1, filterNewData);
      }
      if (collectedData[0].actionType && collectedData[0].applicationType && (collectedData[0].startDate && collectedData[0].endDate)){
        const start = new Date(collectedData[0].startDate).getTime();
          const end = new Date(collectedData[0].endDate).getTime();
         
          const temp = new Date(item.creationTimestamp).getTime();
        if((item.actionType == collectedData[0].actionType) && (item.applicationType == collectedData[0].applicationType)  && (temp >= start && temp <= end)){
          
           filterNewData.push(item);
           
                 setTotalData(filterNewData);
             setApiData(filterNewData);
             setTotalPages(
               Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
             );
             getCount(1, filterNewData);
        }
      }
    }
     if((collectedData[0].startDate && collectedData[0].endDate) && ((collectedData[0].actionType == null) || (collectedData[0].actionType == "Select Action Types")) && ((collectedData[0].applicationType == null) || (collectedData[0].applicationType == "Select Application Types")) && collectedData[0].applicationId== null){
      const start = new Date(collectedData[0].startDate).getTime();
      const end = new Date(collectedData[0].endDate).getTime();
     
      const temp = new Date(item.creationTimestamp).getTime();   
      if (temp >= start && temp <= end) {
             
              filterNewData.push(item);
             
                    setTotalData(filterNewData);
                setApiData(filterNewData);
                setTotalPages(
                  Array.from({ length: Math.ceil(filterNewData.length / 10) }, (v, i) => i + 1)
                );
                getCount(1, filterNewData);
              
            }
      // const data = dataHolder.filter((ele) => {
      //   if (ele["creationTimestamp"]) {
      //     const temp = new Date(ele["creationTimestamp"]).getTime();
      //     if (temp >= start && temp <= end) {
      //       console.log('filterDate--', ele)
      //       return ele;
      //     }
      //   }
      // });
     }
  
    if ( collectedData[0].actionType == "Select Action Types"  &&   collectedData[0].applicationType == "Select Application Types" &&  collectedData[0].applicationId == null && collectedData[0].startDate == null &&  collectedData[0].endDate == null){
    
    setTotalData(tableData);
    setApiData(tableData);
    setTotalPages(
      Array.from({ length: Math.ceil(tableData.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, tableData);
  }
  })
}

else{
  setTotalData(tableData);
  setApiData(tableData);
  setTotalPages(
    Array.from({ length: Math.ceil(tableData.length / 10) }, (v, i) => i + 1)
  );
  getCount(1, tableData);
}

}

  const getCount = (id, data) => {
    const temp = Array.from(
      { length: Math.ceil(data.length / 10) },
      (v, i) => i + 1
    );
    if (id > 0 && temp[temp.length - 1] >= id) {
      const temp = data.filter((ele, i) => i < id * 10 && i >= id * 10 - 10);
      setCurrentPage(id);
     
      try{
        setApiData(temp);
      }catch(error){
        console.log('dataCounterror', error)
      }
 
    } else {
      setApiData(data);
    }
  };

  const sort = (id) => {
    if (id === "logId" || id === "companyId" || id === "applicationId") {
      const result = totalData.sort((x, y) => x[id] - y[id]);
      if (flag.user) {
        result.reverse();
      }
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else if (id === "creationTimestamp") {
      const result = totalData.sort(
        (x, y) =>
          new Date(x["creationTimestamp"]).getTime() -
          new Date(y["creationTimestamp"]).getTime()
      );
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else {
      const result = totalData.sort(
        (x, y) => x[id] && x[id].localeCompare(y[id])
      );
      if (flag.user) {
        result.reverse();
      }
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    }
    if(tableOrder == 'asc'){
      setTableOrder(false);
    }else{
      setTableOrder('asc');
    }
  };

  
  const filterApplication = async (filterby, search) => {
   
    search = search.trim();
   
    if (search !== "") {
      const data = dataHolder.filter((ele) => {
        if (ele[filterby] && ele[filterby].toString().includes(search)) {
          return ele;
        }
      });
      
      setTotalData(data);
      setTotalPages(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      setTotalPages(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };

  const filterdate = async (date) => {
  
    if (date.start !== "" && date.end !== "") {
      const start = new Date(date.start).getTime();
      const end = new Date(date.end).getTime();

      const data = dataHolder.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const temp = new Date(ele["creationTimestamp"]).getTime();
          if (temp >= start && temp <= end) {
           
            return ele;
          }
        }
      });
   
    if(data.length > 0){
      setTotalData(data);
      setTotalPages(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    }  
    } 
    else {
      setTotalData(dataHolder);
      setTotalPages(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };
  return (
 
    <Fragment>
    
      <Container fluid={true}>
        <Row>
          <Col>
         
            <div className="p-4 m-10 !important">
           
              <Filter
                totalDataFilter={totalDataFilter}
                apiData={totalData}
                // filterUsers={filterUsers}
                filterdate={filterdate}
                filterApplication={filterApplication}
                // SearchParams={(e) => SearchParams(e)}
                filterCombine={(e) => filterCombine(e)}
              />
            </div>
            <div className="p-4 m-10 !important">
              <Table bordered className="table table-striped m-10">
                <thead>
                  <tr>
                    <th>
                      <span onClick={() => sort('logId')}>Log Id{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      <span onClick={() => sort('applicationType')}>Application Type{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      <span onClick={() => sort('applicationId')}>Application Id{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    
                    <th>
                      <span onClick={() => sort('actionType')}>Action{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      <span onClick={() => sort('actionType')}>Action Details{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                   <span onClick={() => sort('creationTimestamp')}>Date : Time{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>

                    </th>
                  </tr>
                </thead>
                <tbody>
                
                  {apiData.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.logId}</td>
                        <td>{data.applicationType || "-/-"}</td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.applicationId || "-/-"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              <span>{data.actionType || "-/-"}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              <span>{data.actionDetails || "-/-"}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                        
                          {data.creationTimestamp}
                          {/* {new Date(
                              data.creationTimestamp
                            ).toLocaleDateString("es-CL")} */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center">
              <Pagination aria-label="Page navigation">
                <PaginationItem>
                  <PaginationLink
                    onClick={() => getCount(currentPage - 1, totalData)}
                  >
                    <span aria-hidden="true">«</span>
                  </PaginationLink>
                </PaginationItem>
                {totalPages.map((ele) => (
                  <PaginationItem>
                    <PaginationLink onClick={() => getCount(ele, totalData)}>
                      {ele}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => getCount(currentPage + 1, totalData)}
                  >
                    <span aria-hidden="true">»</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Loggertable;


