/**
 * Class to get users to sign in and call Task or Browse.
 * @class SignIn
 */

/* React Modules & Components */
import React from 'react';

/* Custom Components */
import Task from '../task/Task.js';
import Prompts from '../prompts/Prompts.js';
import UserSelection from '../users/UserSelection.js';
import AdminInterface from '../admin/AdminInterface.js';
import Authorize from '../authorization/Authorization.js';

/* Styling */
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            userType: "Empty",
            authorized: false
        }
    }

    /**
     * Set the user's origin (i.e. Amazon Mechanical Turk, Oxy, or Other)
     * @param {string} type - The type of user
     */
    setUser = (type) => {
        this.setState({
            userType: type
        });
    }

    /**
     * Authorize the user to take the survey.
     */
    setAuthorize = () => {
        this.setState({
            authorized: true
        });
    }

    render(){
        /** Conditionally render information */
        let prompt = <div/>;

        /** Conditionally render next game button or game space */
        let display = <div/>;

        if(this.state.userType === "Empty"){
            // display user selection prompt
            prompt = <Prompts prompLabel="userPrompt" />;
            // have user select which user type they are
            display = <UserSelection handleSubmit={this.setUser}/>;
        }else{
            if(this.state.authorized){
                if(this.state.userType === "ADMIN"){
                /** @TODO select a task from database and visualize it */
                display = <AdminInterface />;
            }else{
                display = <Task userType={this.state.userType}/>;
            }
            }else{
                // display authorization code input prompt
                prompt = <Prompts prompLabel="authorizationPrompt" />;
                // display authorization code input
                display = <Authorize handleSubmit={this.setAuthorize}/>;
            }
        }

        return(
            <div className="SignIn">
                <div className="SignInDisplay">
                    {prompt}
                    {display}
                </div>
            </div>
        )
    }

}

export default SignIn;
