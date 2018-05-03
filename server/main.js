// Only executed on the server
import _ from 'lodash';
import { image, helpers } from 'faker';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';

Meteor.startup(() => {
    // Great place to generate data, and we don't want to insert 5000 data each time we start up server

    // Check to see if data exists in the collection
    // See if the collection has any records
    const numberRecords = Employees.find({}).count();
    console.log(numberRecords);
    if (!numberRecords) {
        // Generate some data...
        _.times(5000, ()=> {
            const { name, email, phone } = helpers.createCard();
            /*
                this line of code above (es6) is similar to this
                const name = helpers.createCard().name;
                const email = helpers.createCard().email;
                const phone = helpers.createCard().phone;
             */

            //save a record to mongo collection
            Employees.insert({
                name, email, phone,
                /* the es6 code above is equivalent to these:
                name: name,
                email: email,
                phone: phone
                */
                avatar: image.avatar()
            })
        });
    }
    // run 'meteor remove autopublish' on terminal o meteor doesn't return 5000 records at a time
    // this is for performance and security

    Meteor.publish('employees', (per_page) => {
        return Employees.find({}, { limit: per_page });
    })
});
