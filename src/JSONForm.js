import React, { Component } from 'react';
import styles from './JSONForm.module.css';
import { sampleData } from './sampleData';

class JSONForm extends Component {   
    // collect the field names from the sample file
    // this is needed when checking conditional fields later
    state = {
        fieldNames: sampleData.map((field) => field.name),
        formInputs: []
    };

    // update the state for a given form element with index i
    // there is no form validation (yet)
    handleChange (i, event) {

        let formInputs = [...this.state.formInputs];

        // for checkboxes, save true/false instead of the value
        if (event.target.type === 'checkbox') {
            formInputs[i] = event.target.checked;
        }
        else {
            formInputs[i] = event.target.value;
        }

        this.setState({ formInputs });
    }

    // for this example, the form data is dumped to the console as an array of objects
    handleSubmit(event) {
        // this prevents the page from refreshing upon form submission
        event.preventDefault();

        let consoleOutput = [];
        for (var i = 0; i < this.state.fieldNames.length; i++) {
            consoleOutput.push({ 
                name: this.state.fieldNames[i],
                value: this.state.formInputs[i]
            });
        }
        console.log(consoleOutput);
        alert('Form submitted! Please check the console for the form data output.');
    }

    render () {
        // create an array of React elements based on the values
        // found in the source JSON file
        const formFields = sampleData.map((data, i) => {
            // check to see if this field should render based on
            // the conditional rules found in the JSON file
            if (data.conditional) {
                // get the value for the field in question.
                // this assumes that field names in the sample data are unique, as
                // this will only find the first matching element
                const foundIndex = 
                    this.state.fieldNames.findIndex(element => 
                        element === data.conditional.name
                    );

                // run the evaluative function found in the JSON data
                const showThis = data.conditional.show_if(this.state.formInputs[foundIndex]);
                
                if (!showThis) {
                    // don't render this field element.
                    return null;
                }
            }

            return (
                <div key={data.name} className={styles.Input}>
                    <label className={styles.Label}>{data.human_label}</label>
                    <input type={data.type} onChange={this.handleChange.bind(this, i)}></input>
                </div>
                );
        });

        return (
            <div>
                <h1 className={styles.Title}>JSON Form Data Example</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {formFields}
                    <input className={styles.Button} type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default JSONForm;