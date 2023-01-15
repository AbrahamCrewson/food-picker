import React from "react";
import './Navbar.css'
import chef from '../Images/chef.png';
class Navbar extends React.Component{

    render(){
        return(
            <div className="Navbar">
                
                <div id="Name"><img src={chef} alt="logo"></img><h1>Food Picker</h1></div>
                <a href ="https://abrahamcrewson.github.io/portfolio">Check out my other projects!</a>

            </div>
        )
    }
}
export default Navbar;