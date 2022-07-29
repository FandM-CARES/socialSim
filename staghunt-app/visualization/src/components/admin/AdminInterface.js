/**
 * Class render admin interface.
 * @class AdminInterface
 */

/* React Modules & Components */
import React from 'react';
import Form from 'react-bootstrap/Form';

/* Custom Components */
import Browse from './browsing/Browse.js';

/* Styling */
import './Admin.css';

class AdminInterface extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            viewing: ""
        };
    }

    handleChange = (e) => {
        let value = e.target.value;
        if(["INPUT", "BROWSE"].includes(value)){
            this.setState({
                viewing: value
            });
        }
    }

    render(){
        let viewing = this.state.viewing;

        let buttonPrompt = <div>Please select an option for viewing.</div>;

        /** Conditionally render information */
        let prompt = <div/>;

        /** Conditionally render display */
        let display = <div/>;

        /** @TODO: Set prompt */
        switch (viewing) {
            case "INPUT":
                display = <RenderInput />;
                break;
            case "BROWSE":
                display = <Browse />;
                break;
            default:
                display = <div/>;
        }

        return(
            <div className="browseContainer">
                <div className="viewSelection">
                  <Form.Group>
                    <Form.Label>{buttonPrompt}</Form.Label>
                    <Form.Control aria-label="Default select example" as="select" value={viewing} onChange={this.handleChange}>
                      <option>Select one of the following</option>
                      <option value="BROWSE">Browse uploaded games</option>
                      <option disabled={true} value="INPUT">Render game from input</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="display">
                    {prompt}
                    {display}
                </div>
            </div>
        )
    }

}

export default AdminInterface;
