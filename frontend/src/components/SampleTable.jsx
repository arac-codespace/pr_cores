import React, { Component } from 'react';

class SampleTable extends Component {
	render() {
		let samples = this.props.samples;
		let isNull = "No info";
		if (samples.length >= 1) {
			return (
				<table className="table table-sm table-hover table-bordered">
				  <thead className="thead-dark">
				    <tr>
				      <th scope="col">Sample No:</th>
				      <th scope="col">Depth</th>
				      <th scope="col">Total Length</th>
				    </tr>
				  </thead>
				  <tbody>
					  {samples.map((sample,index) => (	
					    <tr key={"sample_"+sample.id}>			      
					      <td>{sample.sample_no ? sample.sample_no : isNull}</td>
					      <td>{sample.depth ? sample.depth : isNull}</td>
					      <td>{sample.total_length? sample.total_length : isNull}</td>
					    </tr>
					  ))}
				  </tbody>
				</table>				
			);
		} else {
			return (
				<p>No Information Available</p>
			)
		}
	}
}

export default SampleTable;