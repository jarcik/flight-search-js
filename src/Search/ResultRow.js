import React, { Component } from 'react';

class ResultRow extends Component {
  render() {      
      let flight = this.props.flight;
      let dTime = new Date(flight.dTime*1000);
      let dateTime = dTime.toLocaleDateString("en-GB") + " " + dTime.toLocaleTimeString("en-GB");
    return (
      <tr className="ResultRow">
        <td>{flight.cityFrom}</td>
        <td>{flight.cityTo}</td>
        <td>{dateTime}</td>
        <td>{flight.price} EUR</td>
      </tr>
    );
  }
}

export default ResultRow;
