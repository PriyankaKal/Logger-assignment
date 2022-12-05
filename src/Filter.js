import React, { useState } from "react";
import {Route, useNavigate} from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";

const Filter = (props) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState();
  const [applicationType, setApplicationType] = useState();
  const [applicationId, setApplicationId] = useState();
  const [searchData, setSearch] = useState({ start: "", end: "" });


  const submitButton = () => {
    // if (actionType) {
    //   props.filterUsers("actionType", actionType);
    //   setActionType();
    // }
    // else if (applicationType) {
    //   props.filterUsers("applicationType", applicationType);
    //   setApplicationType();
    // }
    // else if (applicationId) {
    //   props.filterApplication("applicationId", applicationId);
    //   setApplicationId();
    // }
    // else if (searchData.start !== "" && searchData.end !== "") {
    //   props.filterdate(searchData)
    // }
if(actionType || applicationType || applicationId || searchData.start || searchData.end){
  let filterArray = [];
  filterArray = [{actionType : actionType ? actionType : null , applicationType :applicationType ? applicationType : null, applicationId : applicationId ? applicationId : null, startDate :searchData.start ? searchData.start : null, endDate : searchData.end ? searchData.end : null}];
  console.log('filterArray--123', filterArray , filterArray.length);
  let filterArrayUpdated = [];
  props.filterCombine(filterArray);
  let searchData1 = '';
  
 if ((actionType && actionType!=="Select Action Types") && ((applicationType && applicationType!=="Select Application Types")) && applicationId && searchData.start && searchData.end){
  searchData1 = `actionType=${actionType}?applicationType=${applicationType}?applicationId=${applicationId}?startDate=${searchData.start},${searchData.end}`

}
if ((actionType && actionType!=="Select Action Types") && ((applicationType && applicationType!=="Select Application Types")) && applicationId){
  searchData1 = `actionType=${actionType}?applicationType=${applicationType}?applicationId=${applicationId}`
  console.log(searchData1,"searchDataNew", )
}
else if(actionType && actionType!=="Select Action Types"){
      searchData1 = `actionType=${actionType}` ;
      if((actionType && actionType!=="Select Action Types") && searchData.start && searchData.end ){
        searchData1 = `actionType=${actionType}?startDate=${searchData.start},${searchData.end}` ;
      }
       if (actionType && (applicationType && applicationType!=="Select Application Types")){
        searchData1 =  `actionType=${actionType}?applicationType=${applicationType}`;  
      }
      if(actionType && applicationType  && searchData.start && searchData.end ){
        searchData1 = `actionType=${actionType}?applicationType=${applicationType}?startDate=${searchData.start},${searchData.end}` ;
      }
    }
    else  if (applicationType && applicationType!=="Select Application Types"){
      searchData1 =  `applicationType=${applicationType}`;
      console.log('applicationType-else')
    }
    else if(applicationId && applicationId!=='' && applicationId!==null){
      searchData1 = `applicationId=${applicationId}`;
      if ((actionType && actionType!=="Select Action Types") && (applicationType && applicationType!=="Select Application Types") && applicationId){
        searchData1 = `actionType=${actionType}?applicationType=${applicationType}?applicationId=${applicationId}`
       }
    }
  
else if (searchData.start && searchData.end){
  searchData1 = `startDate=${searchData.start},${searchData.end}` 
}
    
    // : 'No data found';
    console.log(searchData1,"searchData", )
    if((searchData1 !== 'No data found') || (searchData1 !== '')){
      navigate(`?${searchData1} `)
      // props.SearchParams(`?${searchData1}`)
    }
    else if(searchData1== ''){
      navigate(`${searchData1} `)
    }


}
else{
  props.filterCombine(false);
}

    // let searchData1 = actionType ? `actionType=${actionType}` 
    // : applicationType ? `applicationType=${applicationType}` 
    // : applicationId ? `applicationId=${applicationId}` 
    // : searchData.start ? `startDate =${searchData.start},${searchData.end}` 
    // : 'No data found';
    // console.log(searchData1,"searchData", searchData1.includes('startDate'))
    // if((searchData1 !== 'No data found')){
    //   navigate(`?${searchData1} `)
    //   props.SearchParams(`?${searchData1}`)
    // }

  
  }

  var actType =props.totalDataFilter &&  props.totalDataFilter.reduce((unique, i) => {
    if(!unique.some(obj => obj.actionType === i.actionType)){
      unique.push(i);
    }

    return unique;
  },[]);

  var appliType =props.totalDataFilter &&  props.totalDataFilter.reduce((unique, i) => {
    if(!unique.some(obj => obj.applicationType === i.applicationType)){
      unique.push(i);
    }
    return unique;
  },[]);

  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Label>{"ActionType"}</Label>
          <select value={actionType} onChange={(e) => setActionType(e.target.value)}
            className="option1" placeholder="select action type">
            <option value="Select Action Types">Select Action Types</option>
            {actType && actType.map((val, i) => (
              <option key={i} value={val.actionType}>
                {val.actionType}
              </option>
            ))}
          </select>
        </Col>
        <Col className="mb-3 option">
          <FormGroup>
            <Label>{"ApplicationTypes"}</Label>
            <select value={applicationType} onChange={(e) => setApplicationType(e.target.value)}
              className="option1" placeholder="select application type">
              <option value="Select Application Types" >Select Application Types</option>
              {appliType && appliType.map((val, i) => {
                if (val.applicationType !== null) {
                  return (
                    <option key={i} value={val.applicationType}>
                      {val.applicationType}
                    </option>
                  )
                }
              })}
            </select>
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"ApplicationId"}</Label>
            <Input
              className="form-control"
              type="text"
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Enter Application Id"
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"Start Date"}</Label>
            <Input
              className="form-control"
              value={searchData.start}
              onChange={(e) => setSearch({ ...searchData, start: e.target.value })}
              type="date"
              placeholder=""
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"End Date"}</Label>
            <Input
              className="form-control"
              value={searchData.end}
              onChange={(e) => setSearch({ ...searchData, end: e.target.value })}
              type="date"
              placeholder=""
            />
          </FormGroup>
        </Col>
        <Col class="py-2">
          <button
            type="button"
            class="btn btn-primary my-4"
            onClick={() => submitButton()}
          >
            Search logger
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default Filter;