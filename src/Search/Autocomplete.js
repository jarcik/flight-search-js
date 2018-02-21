import React, { Component } from 'react';
import './Autocomplete.css';
    
class Autocomplete extends Component {
    constructor(props) {
        super(props);
        //handling changes on input field
        this.handleInputChange = this.handleInputChange.bind(this);
        //selecting autocomplete item
        this.selectItem = this.selectItem.bind(this);
        //setting the state
        this.state = {
            //results from autocomplete
            searchResult: [],
            //current value of input field
            item: ''
        };
        //handle click on document
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    //mounting component
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    //handle document click
    handleDocumentClick(event) {
        if(event && event.target && event.target.tagName !== "INPUT" && event.target.tagName !== 'LI') {
            this.setState({searchResult:[]});
        }
    }

    //change in value of input fields
    handleInputChange(event) {
        let value = event.target.value;

        if(value) {
            //fetching data from api
            fetch("https://api.skypicker.com/locations/?term="+value+"&v=2&locale=en-US")
            .then((results) => {
                return results.json();
            }).then((data) => {
                //updating fetched data results from searching from api
                this.setState({
                    searchResult: data,
                    item:value
                });
            });
        } else {
            //no results
            this.setState({
                searchResult:[],
                item:value
            })
        }
        //update on change on input
        this.props.onChange(this.props.name, value);
    }

    //selecting autocomplete item
    selectItem(event) {
        let value = event.target.textContent;
        this.setState({
            //update input value
            item:value,
            //remove results after selecting an item
            searchResult:[]
        });
        //update on change on input
        this.props.onSelect(this.props.name, value);
    }
    
  render() {
    let searchResults = this.state.searchResult ? this.state.searchResult.locations : null;
    return (
        <div className="FormGroup">
            <label>{this.props.label}</label>
            <input type="text" name={this.props.name} value={this.state.item} onChange={this.handleInputChange} required autoComplete="off" />

            {searchResults && searchResults.length > 0 ?
            
            <ul className="Results">  
            {(searchResults.map((flight, index) => (
                    <li onClick={this.selectItem} key={searchResults[index].id}>{searchResults[index].name}</li>
                )))} 
            </ul>
            
            : ""}
        </div>
    );
  }
}

export default Autocomplete;
