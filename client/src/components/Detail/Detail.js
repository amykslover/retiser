import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import "./Detail.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function priceFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

let order = 'desc';
	
class Detail extends Component {
  
  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }

  render() {
  	 var transactions = [
	  	{
	  		id: 1,
	  		tx_amount: 100,
	  		tx_description: 'Administrative Fee',
	  		tx_category: 'Fee',
	  		tx_date: '2017-01-02'
	  	},
	  	{
	  		id: 2,
	  		tx_amount: 400,
	  		tx_description: 'Safe Harbor Match',
	  		tx_category: 'Employer Contribution',
	  		tx_date: '2017-01-15'
	  	},
	  	{
	  		id: 3,
	  		tx_amount: 800,
	  		tx_description: 'Pre-Tax Payroll Deduction',
	  		tx_category: 'Employee Contribution',
	  		tx_date: '2017-01-15'
	  	}
  	]
  // 		var transactions = [this.props];
		// console.log(transactions);

	    return (
	      <BootstrapTable ref='table' data={ transactions } striped hover>
	        <TableHeaderColumn width='70' dataField='id' isKey={ true} dataSort={ true } >ID</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='tx_date' dataSort={ true } >Date</TableHeaderColumn>
	        <TableHeaderColumn dataField='tx_description' dataSort={ true } >Description</TableHeaderColumn>
	        <TableHeaderColumn dataField='tx_category'dataSort={ true } >Category</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='tx_amount' dataFormat={ priceFormatter } dataSort={ true } >Amount</TableHeaderColumn>
	      </BootstrapTable>
	    );

	}
}

export default Detail;