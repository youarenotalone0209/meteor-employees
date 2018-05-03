import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees.js';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {
    componentWillMount() {
        this.page = 1;
    }

    handleButtonClick() {
        Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
        this.page += 1;
    }

    render() {
        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee =>
                        <EmployeeDetail key={employee._id} employee={employee} />
                    )}
                </div>
                <button onClick={this.handleButtonClick.bind(this)} className='btn btn-primary'>Load More...</button>
            </div>
        );
    }
}

export default createContainer(() => {
    // set up subscription
    // Meteor will tell employees collection that whenever we have changes on the collect, let me know
    Meteor.subscribe('employees', PER_PAGE);
    // return an object. Whatever we return will be sent to EmployeeList
    // as props

    // Just calling find all that really does for us is that returns a cursor and doesn't actually
    // find any records, to find records, we have to call fetch
    return { employees: Employees.find({}).fetch() }
},  EmployeeList);