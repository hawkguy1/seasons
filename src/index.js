// -- DETERMINE LOCATION AND MONTH -- //

import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            // -- WE CALLED SETSTATE
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Spinner message="LOADING..." />;
    }
    render() {
        return <div>{this.renderContent()}</div>
        
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

/*
--- RULES OF STATE --- 
-- WE DID NOT 
this.state.lat = position.coords.latitude WHEN WE CALLED 'setState'
WE NEVER WANT TO DO THIS. WE NEVER WANT TO DO A DIRECT ASSIGNMENT TO OUR STATE OBJECT, UNLESS WE'RE INITIALIZING A STATE INSIDE OUR CONSTRUCTOR FUNCTION//
- ONLY USABLE WITH CLASS COMPONENTS (TECHNICALLY CAN BE USED WITH FUNCTIONAL COMPONENTS USING THE 'HOOKS' SYSTEM)
- YOU WILL CONFUSE PROPS WITH STATE
- 'STATE' IS A JS OBJECT THAT CONTIANS DATA RELEVANT TO A COMPONENT
- UPDATING 'STATE' ON A COMPONENT CAUSES THE COMPONENT TO (ALMOST) INSTANTLY RERENDER 
    - SOLVES PROBLEM OF WHEN GEOLOCATION IS RETURNED, WE WANT THE COMPONENT TO SOMEHOW RERENDER ITSELF. WHEN WE WANT A COMPONENT TO RERENDER ITSELF, WE WILL ALWAYS UPDATE IT'S 'STATE'
- STATE MUST BE INITIALIZED WHEN A COMPONENT IS CREATED
**VERY IMPORTANT ** STATE CAN ONLY BE UPDATED USING THE FUNCTION 'setState'

ONE STATE IS THE USER'S CURRENT LATITUDE. IT IS ALWAYS GOING TO CONTAIN SOME AMOUNT OF INFORMATION THAT IS RELATIVE TO A COMPONENT, AND THUS, WHEN WE CREATE OUR COMPONENT, WE INITIALIZE OUR 'STATE'
*/

/* 
--- COMPONENT LIFECYCLE IN SEQUENTIAL ORDER ---
constructor - GOOD PLACE TO DO ONE-TIME SETUP. IT IS NOT RECOMMENDED TO DO DATA-LOADING HERE, ALTHOUGH YOU TECNICALLY CAN. NOT REQUIRED BY REACT, BUT IS THE FIRST TO BE CALLED, AND IS A GOOD PLACE TO INITIALIZE 'STATE'
render - REACT SAYS WE HAVE TO DEFINE RENDER! THIS RUNS CONSTANTLY - LIFECYCLE COMPONENT - RENDER METHOD IS ONLY USED TO RENDER JSX, AND NOTHING ELSE. WE DON'T WANT TO PULL THE USER'S LOCATION USING THE RENDER METHOD.
(CONTENT VISIBLE ON SCREEN)
componentDidMount - GOOD PLACE TO DO DATA-LOADING
(SIT AND WAIT FOR UPDATES)
componentDidUpdate - GOOD PLACE TO DO MORE DATA-LOADING WHEN STATE/PROPS CHANGE
(SIT AND WAIT UNTIL THIS COMPONENT IS NO LONGER SHOWN)
componentWillUnmount - GOOD PLACE TO DO CLEANUP (ESPECIALLY FOR NON0-REACT STUFF)
*/

