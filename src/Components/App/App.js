import React from 'react';
import './App.css';

import Picker from '../Picker/Picker'
import Navbar from '../Navbar/Navbar';
class App extends React.Component {
  render (){
    return(
      <div className="App">
        <Navbar/>
        
        <Picker/>
        
      </div>
    )
  }
}
export default App;
