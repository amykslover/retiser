import React, {Component} from "react";
import { Panel } from 'react-bootstrap';
import "./Portfolio.css";

class Portfolio extends Component {

	constructor(props) {
		super(props);
	
		this.state = {

		}
	}
	render() {
		console.log(this.props)

		return (
			<Panel className="portfolioPanel"> 
				<div className="portfolio">
					<div>
						<h1>{this.props.age}</h1>
					</div>
					<div> 
						<h1>{this.props.agi}</h1>
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