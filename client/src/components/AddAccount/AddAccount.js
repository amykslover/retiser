import React, { Component } from 'react';
import "./AddAccount.css";
import { Collapse, Well, Panel, Form, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import helpers from '../../utils/helpers.js';
import csv from 'csv';
import Dropzone from 'react-dropzone';

const csvjson = require('csvjson');
const fs = require('fs');




class AddAccount extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			files: [],
			userId: '',
			accountNumber: '',
			accountInstitution: '',
			accountType: '',
			accountTransactions: []
		};
	}

	componentDidMount() {
		var userId = sessionStorage.getItem('userId');

		this.setState({
			userId: userId
		})
	}

	addNewAccount = (userId, accountNumber, accountType, accountInstitution, accountTransactions) => {

		helpers.addAccount(userId, accountNumber, accountType, accountInstitution, accountTransactions).then(response => {
			console.log(`Account Added: ${JSON.stringify(response.data)}`);
		});

		this.props.getAllAccounts(userId)
		// this.props.getAllTransactions(userId)
	}


	onDrop = (e) => {
	    const reader = new FileReader();
	    reader.onload = () => {

	        csv.parse(reader.result, (err, data) => {

				this.setState({
					fileInfo: e[0],
					accountTransactions: data,
					open: false
				})

			    this.addNewAccount(this.state.userId, this.state.accountNumber, this.state.accountType, this.state.accountInstitution, this.state.accountTransactions);
	        });
	    };
	    reader.readAsBinaryString(e[0]);
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
		      <Col className="inputLabel" componentClass={ControlLabel} sm={2}>
		        Institution
		      </Col>
		      <Col sm={10}>
		        <FormControl 
		        	className="formInput"
		        	type="text" 
		        	name="instution" 
		        	placeholder="Financial Institution" 
		        	value={this.state.value}
		        	onChange={event => this.setState({ accountInstitution: event.target.value })}
		        />
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountNumber">
		      <Col className="inputLabel" componentClass={ControlLabel} sm={2}>
		        Number
		      </Col>
		      <Col sm={10}>
		        <FormControl
		        className="formInput"
		        type="text" 
		        name="number" 
		        placeholder="Account Number" 
		        value={this.state.value}
		        onChange={event => this.setState({ accountNumber: event.target.value })}
		        />

		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountType">
		      <Col className="inputLabel" componentClass={ControlLabel} sm={2}>
		        Type
		      </Col>
		      <Col sm={10}>

		        <select
		        className="formInput"
		        onChange={event => this.setState({ accountType: event.target.value })}
		        name="accountType">
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
				<section className="dropzoneSection">
			        <div>
			          <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
			            <div className="dropzoneDiv">
			        		<p>drop retirement account file here</p>
			            </div>
			          </Dropzone>
			        </div>
			    </section>
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