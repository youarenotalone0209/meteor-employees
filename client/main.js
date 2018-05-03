import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeLists from './components/employee_list';


const App = () => {
    return (
       <EmployeeLists />
    );
};

// After Meteor loads in the browser, render my app to the DOM.
Meteor.startup(() => {
    // React render call
    ReactDOM.render(<App />, document.querySelector('.container'));
});