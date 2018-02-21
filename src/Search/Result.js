import React, { Component } from 'react';
import ResultRow from './ResultRow';
import './Result.css';

class Result extends Component {
  constructor(props) {
      super(props);
      //inicialization of state of the component
      this.state = {
          //current page
          currentPage: 1,
          //number of items on page
          itemsOnPage: 5
      }
      //hadnle click on pagination
      this.paginationClick = this.paginationClick.bind(this);
  }

  //update on props
  componentWillReceiveProps(newProps) {
    //when new results, update current page to init value
    this.setState({currentPage:1});
  }

  //handlick click on paging number
  paginationClick(event) {
    if(event && event.target && event.target.textContent) {
      //change current page number
      this.setState({currentPage:event.target.textContent});
    }
  }

  render() {
    //currently displayed rows
    let results = [];
    //new pagination numbers
    let pages = [];
    //if there are results
    if(this.props.flights && this.props.flights.data && this.props.flights.data.length > 0) {
      //indexes to slice results
      let lastIndex = this.state.currentPage * this.state.itemsOnPage;
      let firstIndex = lastIndex - this.state.itemsOnPage;
      //fill pagination numbers
      for (let i = 1; i <= Math.ceil(this.props.flights.data.length / this.state.itemsOnPage); i++) {
        pages.push(i);
      }
      //slice flights from searching into displayed rows
      results = this.props.flights.data.slice(firstIndex, lastIndex);
    }

    return (
        <div className="Result">
        {this.props.flights && this.props.flights.data && this.props.flights.data.length > 0 ?
      <div>
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

          {(results.map((result, index) => (
              <ResultRow flight={result} key={result.id} />
          )))}        
          
        </tbody>
        </table>
        
        <div className="paging">
        {(pages.map((page, index) => (
                <span key={page} onClick={this.paginationClick} className={this.state.currentPage == page ? 'active' : ''}>{page}</span>
            )))}
        </div>
      </div>
        : ((this.props.flights && this.props.flights.data) ?
            <div>No data, sorry</div> : ''
        )}
      </div>
    );
  }
}

export default Result;
