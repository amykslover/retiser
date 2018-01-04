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
    const transactions = this.props.transactions;
    console.log(transactions);

	    return (
	      <BootstrapTable className="detailtable" ref='table' data={ transactions } striped hover>
	        <TableHeaderColumn width='70' dataField='id' isKey={ true} dataSort={ true } >ID</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='date' dataSort={ true } >Date</TableHeaderColumn>
	        <TableHeaderColumn dataField='description' dataSort={ true } >Description</TableHeaderColumn>
	        <TableHeaderColumn dataField='category'dataSort={ true } >Category</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='amount' dataFormat={ priceFormatter } dataSort={ true } >Amount</TableHeaderColumn>
	      </BootstrapTable>
	    );

	}
}

export default Detail;