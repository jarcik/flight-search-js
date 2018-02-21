import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Form.css';
import calendarIco from './icon-calendar.svg';
import Autocomplete from './Autocomplete';
    
class Form extends Component {
    constructor(props) {
        super(props);
        //init of state of the form fields
        let today = new Date();
        //inicialization of state of the form
        this.state = {
            //city from (to api call)
            from: '',
            //city to (to api call)
            to: '',
            //formatted date (to api call)
            date: today.toLocaleDateString('en-GB'),
            //date for datepicker
            dateFromDate: today,
            //is datepicker shown?
            showDayPicker: false,
            //autocomplete data
            autocompleteData: []
        };

        //handling changes on input fields of autocomplete
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        //handle selecting date
        this.handleDateChange = this.handleDateChange.bind(this);
        //handling submitting the form
        this.onSubmit = this.onSubmit.bind(this);
        //click on calendar icon -> show/hide
        this.calendarIconClick = this.calendarIconClick.bind(this);
    }

    //change in value of input fields
    handleInputChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    //change in date value
    handleDateChange(day, { selected }) {
        //date should be in dd/mm/yy format
        this.setState({
            date: selected ? undefined : day.toLocaleDateString('en-GB'),
            dateFromDate: selected ? undefined : day,
            showDayPicker: false
        });
    }

    //submitting form
    onSubmit(event) {        
        event.preventDefault();
        //submitting form
        this.props.submitForm(this.state);
    }

    //click on calendar icon -> show or hide
    calendarIconClick(event) {
        //show/hide picker
        this.setState({showDayPicker: !this.state.showDayPicker});
    }

    //handle change on autocomplete
    handleAutocompleteChange(name, value) {
        //updating form value for from/to inputs
        this.setState({
            [name]: value
        });
    }

  render() {
    return (
        <form onSubmit={this.onSubmit} className="Form" autoComplete="off">        
        <Autocomplete label="From" name="from" onChange={this.handleAutocompleteChange} onSelect={this.handleAutocompleteChange} />
        <Autocomplete label="To" name="to" onChange={this.handleAutocompleteChange} onSelect={this.handleAutocompleteChange} />
        <div className="FormGroup">
            <label>Date</label>
            <img src={calendarIco} alt="calendar icon" onClick={this.calendarIconClick} />
            <label onClick={this.calendarIconClick}>{this.state.date}</label>
            {this.state.showDayPicker ? <DayPicker selectedDays={this.state.dateFromDate} onDayClick={this.handleDateChange} /> : null}
        </div>
        <input type="submit" value="SUBMIT" />
      </form>
    );
  }
}

export default Form;
