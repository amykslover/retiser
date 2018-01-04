import React, {Component} from "react";
import {Bar} from "react-chartjs-2";


class Chart extends Component {

	constructor(props) {
		super(props);
		
		let x = [];
		let y = [];

		props.contrib.map(item => {
			x.push(item.year);
			y.push(item.total);
		});

		//  Only chart recent 5 years 
		if (props.contrib.length > 5) {
			let delItems = props.contrib.length - 5;
			for (let i=1;i<= delItems;i++) {
				x.shift();
				y.shift();
			}
		}

		// store data for X and Y axis to be used for charting
		this.state = {
			xData: x,
			yData: y
		}
	}

	render() {
		return (
			<div>
				<Bar 
					data={
						{
							labels: this.state.xData,
	        		datasets: [{
	            	label: '$$',
	            	data: this.state.yData,
	            	backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)'
	            	],
	            	borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)'
	            	],
	            	borderWidth: 2
	        		}]
						}
					}
					wdith={200}
					height={200}
					options={{
						title: {
							display: true,
							text: 'Annual Contributions',
							position: 'bottom',
							fontSize: 25
						},
						layout: {
							padding:{left: 50, bottom: 0, top: 0, right: 50}
						}
					}} 
				/>
			</div>
		);
	}
}

export default Chart;