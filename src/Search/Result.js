import React, { Component } from 'react';
import ResultRow from './ResultRow';
import './Result.css';

class Result extends Component {
  render() {
    return (
        <div className="Result">
        {this.props.flights && this.props.flights.data && this.props.flights.data.length > 0 ?
        
      <table>
      <thead>
          <tr>
              <th>From</th>
              <th>To</th>
              <th>Date and Time</th>
              <th>Price</th>
          </tr>
      </thead>
      <tbody>

        {(this.props.flights.data.map((flight, index) => (
                <ResultRow flight={this.props.flights.data[index]} key={this.props.flights.data[index].id} />
            )))}        
        
      </tbody>
      </table>
        
        : ((this.props.flights && this.props.flights.data) ?
            <div>No data, sorry</div> : ''
        )}
      </div>
    );
  }
}

export default Result;
