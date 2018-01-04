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
			disabled: true,
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

	addNewAccount = (userId, accountNumber, accountType, accountInstitution) => {

		helpers.addAccount(userId, accountNumber, accountType, accountInstitution).then(response => {
			console.log(`Account Added: ${JSON.stringify(response.data)}`);
		});
	}

	



	onDrop = (e) => {

	    const reader = new FileReader();

	    reader.onload = () => {

	        csv.parse(reader.result, (err, data) => {
	            console.log(data);

				this.setState({
					fileInfo: e[0],
					accountTransactions: data,
				})

				console.log(this.state);
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
		      <Col componentClass={ControlLabel} sm={2}>
		        Institution
		      </Col>
		      <Col sm={10}>
		        <FormControl 
		        	type="text" 
		        	name="instution" 
		        	placeholder="Financial Institution" 
		        	value={this.state.value}
		        	onChange={event => this.setState({ accountInstitution: event.target.value })}
		        />
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountNumber">
		      <Col componentClass={ControlLabel} sm={2}>
		        Number
		      </Col>
		      <Col sm={10}>
		        <FormControl 
		        type="text" 
		        name="number" 
		        placeholder="Account Number" 
		        value={this.state.value}
		        onChange={event => this.setState({ accountNumber: event.target.value })}
		        />

		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formAccountType">
		      <Col componentClass={ControlLabel} sm={2}>
		        Type
		      </Col>
		      <Col sm={10}>

		        <select 
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
				
				<section>
			        <aside>
			          <button type="button" onClick={() => this.setState({ disabled: !this.state.disabled })}>Toggle disabled</button>
			        </aside>
			        <div className="dropzone">
			          <Dropzone onDrop={this.onDrop.bind(this)} disabled={this.state.disabled}>
			            <p>Try dropping some files here, or click to select files to upload.</p>
			          </Dropzone>
			        </div>
			        <aside>
			          <h2>Dropped files</h2>
			          <ul>
			            {
			              this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
			            }
			          </ul>
			        </aside>
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