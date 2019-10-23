import React, { Component } from 'react';

class DateForm extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setFullYear(date.getFullYear() - 18);

        this.state = {
            datePickerActive: false,
            selected_date: date,
            selected_day: date.getDate(),
            selected_month: date.getMonth(),
            selected_year: date.getFullYear()
        };
    }

    componentDidMount() {
        let datePicker = document.querySelector('.date-picker');

        datePicker.addEventListener('click', e => {
            this.showDatePicker(e);
            let datePickerDiv = document.getElementById('selected-date');

            let activeClass = document.querySelector('.active');
            activeClass
                ? datePickerDiv.classList.add('datepicker-active')
                : datePickerDiv.classList.remove('datepicker-active');
        });
    }

    updateDate() {
        let selectedDay = this.state.selected_day;
        let daysInMonth = this.getDaysInMonth(
            parseInt(this.state.selected_month) + 1,
            parseInt(this.state.selected_year)
        );

        if (daysInMonth < this.state.selected_day) {
            selectedDay = daysInMonth;
        }

        let selectedDate = new Date(
            this.state.selected_year,
            this.state.selected_month,
            selectedDay
        );

        this.setState(
            { selected_date: selectedDate, selected_day: selectedDay },
            () => {
                let date_selected = document.querySelector('.selected-date');
                date_selected.value = this.formatDate(selectedDate);
            }
        );
    }

    formatDate(dateToFormat) {
        return new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(dateToFormat);
    }

    checkEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }
        return false;
    }

    showDatePicker(e) {
        if (!this.checkEventPathForClass(e.composedPath(), 'dates') || this.checkEventPathForClass(e.composedPath(), 'close')) {
            this.setState({
                datePickerActive: !this.state.datePickerActive
            });
        }
    }

    chooseYear() {
        let min = 1900,
            max = new Date().getFullYear() - 18;

        const options = [];

        for (let i = max; i >= min; i--) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        return (
            <div>
                <select
                    value={this.state.selected_year}
                    name='year'
                    className='form-control date'
                    onChange={e => {
                        this.setState({ selected_year: e.target.value }, () => {
                            this.updateDate();
                        });
                    }}
                >
                    {options}
                </select>
            </div>
        );
    }

    chooseMonth() {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let min = 0,
            max = months.length - 1;

        const options = [];

        for (let i = min; i <= max; i++) {
            options.push(
                <option key={i} value={i}>
                    {months[i]}
                </option>
            );
        }

        return (
            <div>
                <select
                    value={this.state.selected_month}
                    name='year'
                    className='form-control date'
                    onChange={e => {
                        this.setState(
                            { selected_month: e.target.value },
                            () => {
                                this.updateDate();
                            }
                        );
                    }}
                >
                    {options}
                </select>
            </div>
        );
    }

    getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    handleClick(e) {
        this.setState({ selected_day: e.target.id }, () => {
            this.updateDate();
        });
        let daysElements = document.getElementsByClassName('day');
        Array.from(daysElements, child => {
            child.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }

    chooseDay() {
        let selectedDate = this.state.selected_date;

        let dayElements = [];
        let daysAmount = this.getDaysInMonth(
            selectedDate.getMonth() + 1,
            selectedDate.getFullYear()
        );

        for (let i = 0; i < daysAmount; i++) {
            dayElements.push(
                <div
                    tabIndex='0'
                    key={i}
                    id={i + 1}
                    className={
                        'day ' +
                        (this.state.selected_day === i + 1 ? 'selected' : '')
                    }
                    onKeyPress={e => {
                        if (e.charCode === 13) {
                            this.handleClick(e);
                        }
                    }}
                    onClick={e => {
                        this.handleClick(e);
                    }}
                >
                    {i + 1}
                </div>
            );
        }

        return <div className='days'>{dayElements}</div>;
    }

    handleDate = () => {
        var selected_date = this.state.selected_date;
        this.props.onSelectDate(selected_date);
    };

    render() {
        return (
            <div className='date-picker'>
                <input
                    readOnly
                    // value={this.formatDate(this.state.selected_date)}
                    value={this.formatDate(this.state.selected_date)}
                    onClick={() =>
                        this.props.data.changeYear(
                            this.formatDate(this.state.selected_date)
                        )
                    }
                    id='selected-date'
                    className='selected-date'
                    type='text'
                    name='year'
                />

                <div
                    id='dates'
                    className={
                        this.state.datePickerActive ? 'dates active' : 'dates'
                    }
                >
                    {this.chooseYear()}
                    {this.chooseMonth()}
                    {this.chooseDay()}
                </div>
                <div
                    id='close'
                    onClick={() =>
                        this.props.data.changeYear(
                            this.formatDate(this.state.selected_date)
                        )
                    }
                    className={
                        this.state.datePickerActive ? 'close active' : 'dates'
                    }
                >Click to close
                    
                </div>
            </div>
        );
    }
}

export default DateForm;
