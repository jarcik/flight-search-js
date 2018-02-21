import React, { Component } from 'react';

class ResultRow extends Component {
  render() {      
    //currently rendered flight
      let flight = this.props.flight;
      //date and time from tics
      let dTime = new Date(flight.dTime*1000);
      //date and time to display
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
