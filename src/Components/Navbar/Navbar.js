import React from "react";
import './Navbar.css'
import chef from '../Images/chef.png';
class Navbar extends React.Component{

    render(){
        return(
            <div className="Navbar">
                
                <div id="Name"><img src={chef}></img><h1>Food Picker</h1></div>
                <button>Check out my other projects!</button>

            </div>
        )
    }
}
export default Navbar;