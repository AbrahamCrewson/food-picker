import React from "react";

class Map extends React.Component{
    
    render(){
        return(
            

            <iframe  id='frame' title="Map" src="https://www.mapquest.com/search/food" width={1000} height={1000} frameborder="0"></iframe>
        
        
        
        
        );
    }
}
export default Map;