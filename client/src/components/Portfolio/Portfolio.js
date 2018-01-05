import React, {Component} from "react";
import { Panel } from 'react-bootstrap';
import "./Portfolio.css";
import PortfolioAmount from "../PortfolioAmount"
import Amount from "../Amount"
import helpers from '../../utils/helpers.js';

class Portfolio extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			userId: '',
			balanceT: 0,
			balanceY: 0,
			contributionIra: 0,
			contribution401k: 0
		}
	}


	transactionFilter(transactions, timeperiod, category) {
		console.log("================",timeperiod, category)
		return transactions.filter(trans => trans.year === timeperiod && trans.category === category)
	}


	render() {
		const { accounts, transactions } = this.props

		console.log(transactions)

		return (
			<Panel className="portfolioPanel"> 
				<div className="portfolio">
					<Amount
						label="Total Retirement Balance"
						value={transactions}
						type="primary"
					/>

					<div>
						<h1>{this.props.age}</h1>
					</div>

					<div> 
						<h1>{this.props.agi}</h1>
					</div>

					<div> 
						<h1>{this.state.balanceT}</h1>
					</div>
					<div> 
						<h1>{this.state.balanceY}</h1>
					</div>
					<div> 
						<h1>401k Chart</h1>
					</div>
					<div> 
						<h1>IRA Chart</h1>
					</div>
				</div>
			</Panel>
		);
	}
}

export default Portfolio;