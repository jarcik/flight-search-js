import React, { Component } from 'react';
import './Search.css';
import Form from './Form';
import Result from './Result';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            //serached flights
          flights: [],
          //loader show during api request
          loader: false
        };
      }
    
    //submitted form for searching
    submitForm(form){
        if(form) {
            //show loader
            this.setState({
                loader:true,
                flights:[]
            });
            //serach flights
            this.getFlights(form);
        }
    }

    //flight api serach
    getFlights(form) {
        //url
        let basicUrl = "https://api.skypicker.com/flights?";
        let from = "flyFrom=" + encodeURIComponent(form.from);
        let to = form.to ? "&to="+ encodeURIComponent(form.to) : '';
        let date = "&dateFrom=" + encodeURIComponent(form.date);
        let sort = "&sort=date";
        let url = basicUrl+from+to+date+sort;
        //fetching data
        fetch(url).then((results) => {
            return results.json();
        }).then((data) => {
            this.setState({
                //fetched data
                flights: data,
                //hide loader
                loader:false
            });
        });
    }
  render() {
    return (
      <div>
            <Form submitForm={this.submitForm.bind(this)} />
            <Result flights={this.state.flights} />
            {this.state.loader ?
            <div className="loader">
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div> : ""}
      </div>
    );
  }
}

export default Search;
