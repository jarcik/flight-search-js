import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Form.css';
import calendarIco from './icon-calendar.svg';
    
class Form extends Component {
    constructor(props) {
        super(props);
        //init of state of the form fields
        let today = new Date();
        //inicialization of state of the form
        this.state = {
            from: '',
            to: '',
            date: today.toLocaleDateString('en-GB'),
            dateFromDate: today,
            showDayPicker: false
        };

        //handling changes on input fields
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        //handling submitting the form
        this.onSubmit = this.onSubmit.bind(this);
        //click on calendar icon -> show/hide
        this.calendarIconClick = this.calendarIconClick.bind(this);
    }

    //change in value of input fields
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

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
        });
    }

    //submitting form
    onSubmit(event) {        
        event.preventDefault();
        this.props.submitForm(this.state);
    }

    //click on calendar icon -> show or hide
    calendarIconClick(event) {
        this.setState({showDayPicker: !this.state.showDayPicker});
    }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="Form">
        <div className="FormGroup">
            <label htmlFor="from">From</label>
            <input type="text" name="from" id="from" value={this.state.from} onChange={this.handleInputChange} required />        
        </div>
        <div className="FormGroup">
            <label htmlFor="to">To</label>
            <input type="text" name="to" id="to" value={this.state.to} onChange={this.handleInputChange} required />
        </div>
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
