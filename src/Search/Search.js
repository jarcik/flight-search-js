import React, { Component } from 'react';
import './Search.css';
import Form from './Form';
import Result from './Result';

class Search extends Component {
    constructor() {
        super();
        this.state = {
          flights: [],
        };
      }
    
    //submitted form for searching
    submitForm(form){
        if(form) {
            console.log(form);
            this.getFlights(form);
        }
    }

    getFlights(form) {
        let basicUrl = "https://api.skypicker.com/flights?";
        let from = "flyFrom=" + encodeURIComponent(form.from);
        let to = form.to ? "&to="+ encodeURIComponent(form.to) : '';
        let date = "&dateFrom=" + encodeURIComponent(form.date);
        let sort = "&sort=date";
        let url = basicUrl+from+to+date+sort;
        fetch(url).then((results) => {
            return results.json();
        }).then((data) => {
            this.setState({
                flights: data
                });
        });
    }
  render() {
    return (
      <div className="Search">
      <Form submitForm={this.submitForm.bind(this)} />
      <Result flights={this.state.flights} />
      </div>
    );
  }
}

export default Search;
