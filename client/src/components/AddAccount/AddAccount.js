import React, { Component } from 'react';
import "./AddAccount.css";
import { Collapse, Well, Panel, Form, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import helpers from '../../utils/helpers.js';



class AddAccount extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
		userId: '',
		accountNumber: '',
		accountInstitution: '',
		accountType: '',
		accountTransactions: []
    	
    };
  }

addNewAccount = (userId, accountData) => {

	helpers.addAccount(userId, accountData).then(response => {
		console.log(`Account Added: ${JSON.stringify(response.data)}`);
	});
}


handleFiles = files => {
	var reader = new FileReader();

    reader.onload = function(e) {
	    var contents = reader.result;
	    console.log(contents);
	    // csvTojs(contents)
	    // this.setState({
	    // 	accountTransactions: reader.result
	    // })
	}
	  reader.readAsText(files[0]);
	  console.log(this.state)
}


csvJSON = csv => {

	var lines   = csv.split("\n");
	var result  = [];
	var headers = lines[0].split(",");

	for(var i=1; i<lines.length; i++){
		var obj = {};
		var currentline = lines[i].split(",");

		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}

	result.push(obj);
  }
  //return result; //JavaScript object
  console.log(JSON.stringify(result))
  return JSON.stringify(result); //JSON
}
	
	render() {

	return(

    <div className="addAccountCollapse">
    <Button className="addAccountButton" onClick={() => this.setState({ open: !this.state.open })}>
    <p><i className='glyphicon glyphicon-plus-sign'></i> New</p>
    </Button>
    <Collapse in={this.state.open}>
    <div>
    <Well>

	  <Panel>

		  <Form horizontal>
		    <FormGroup controlId="formAccountInstitution">
		      <Col componentClass={ControlLabel} sm={2}>
		        Institution
		      </Col>
		      <Col sm={10}>
		        <FormControl 
		        	type="text" 
		        	name="instution" 
		        	placeholder="Financial Institution" 
		        	value={this.state.value}
		        	onChange={this.handleChange}
		        ></FormControl>
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountNumber">
		      <Col componentClass={ControlLabel} sm={2}>
		        Number
		      </Col>
		      <Col sm={10}>
		        <FormControl type="text" name="number" placeholder="Account Number" />
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountType">
		      <Col componentClass={ControlLabel} sm={2}>
		        Type
		      </Col>
		      <Col sm={10}>

		        <select name="accountType">
		          <option value="none">Select Type</option>
		          <option value="401k">401k</option>
		          <option value="Roth401k">401k (Roth)</option>
		          <option value="IRA">IRA</option>
		          <option value="RothIRA">IRA (Roth)</option>
		          <option value="403b">403b</option>
		        </select>
		      </Col>
		    </FormGroup>
			
		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		      
				<ReactFileReader fileTypes={[".csv"]} handleFiles={this.handleFiles}>
				  <Button>Load Account</Button>
				</ReactFileReader>

		      </Col>
		    </FormGroup>
		  </Form>
	  </Panel>
            </Well>
          </div>
        </Collapse>
      </div>
	);

	}
}


export default AddAccount;