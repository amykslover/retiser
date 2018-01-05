import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import "./Detail.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import NumberFormat from 'react-number-format';

function priceFormatter(cell, row) {
  return <NumberFormat value={cell} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
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
	        <TableHeaderColumn width='70' dataField='id' isKey={ true} dataSort={ true } dataAlign='center' >ID</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='date' type="date" dataSort={ true } >Date</TableHeaderColumn>
	        <TableHeaderColumn dataField='description' dataSort={ true } >Description</TableHeaderColumn>
	        <TableHeaderColumn dataField='category'dataSort={ true } >Category</TableHeaderColumn>
	        <TableHeaderColumn width='120' dataField='amount' dataFormat={ priceFormatter } dataSort={ true } dataAlign='right'>Amount</TableHeaderColumn>
	      </BootstrapTable>
	    );

	}
}

export default Detail;