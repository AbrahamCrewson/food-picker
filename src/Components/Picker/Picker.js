import React from "react";
import Map from '../Map/Map';
import './Picker.css';
class Picker extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            term: '',
            choices : ['Chinese Food','Fried Chicken','Burritos','Wings','McDonalds','Fish-n-Chips','Poutine','Grilled-Chicken','Pizza','Burgers','Tacos','Subs'],
            toSelect: [],
            select: [],
            selected: [],
            winner: '',
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.start = this.start.bind(this);
        this.pick = this.pick.bind(this);
        this.end = this.end.bind(this);
        this.restart = this.restart.bind(this);
        this.map = this.map.bind(this);
        
    }
    handleAdd(){
        if(this.state.choices.includes(this.state.term)===false){
            this.setState(current => ({choices: [...current.choices,this.state.term]}));
        }
        else{
            alert('Cannot Add Duplicates');
        }
        
    }
    handleKeypress (event){  
        if (event.key === 'Enter') {  
            if(this.state.choices.includes(this.state.term)===false){
                this.setState(current => ({choices: [...current.choices,this.state.term]}));
            }
            else{
                alert('Cannot Add Duplicates');
            }
         }  
    };
    handleTermChange(event){
        this.setState({term: event.target.value})
    }
    handleRemove(choice){
       
        const index = this.state.choices.indexOf(choice);
        this.setState((state)=> {
                state.choices.splice(index,1)
            return {choices: state.choices};
        })
    }
    async start(){
        document.getElementById('Results').style.display= 'none';
        document.getElementById('Menu').style.display = 'none';
        document.getElementById('Selection').style.display = 'flex';
        await this.setState({toSelect: [...this.state.choices]});
        await this.setState({select: [this.state.toSelect[0],this.state.toSelect[1]]});
        await this.setState((state)=> {
            state.toSelect.splice(0,2)
        return {toSelect: state.toSelect};
        })
        
    }
    async pick(pick){
        console.log(this.state.toSelect);
        if(this.state.selected.length===1){

        }
        if(this.state.toSelect.length>1){
            await this.setState(current => ({selected: [...current.selected,pick]}))
            await this.setState({select: [this.state.toSelect[0],this.state.toSelect[1]]}) 
            await this.setState((state)=> {
                state.toSelect.splice(0,2)
                return {toSelect: state.toSelect};})
        }
        
        else if(this.state.toSelect.length===1){
            await this.setState(current => ({selected: [...current.selected,pick]}))
            await this.setState(current => ({selected: [this.state.toSelect[0],...current.selected]}))
            await this.setState(current => ({toSelect: [...this.state.selected]}))
            await this.setState(current => ({selected: []}))
            await this.setState({select: [this.state.toSelect[0],this.state.toSelect[1]]}) 
            await this.setState((state)=> {
                state.toSelect.splice(0,2)
            return {toSelect: state.toSelect};
        })
        }
        else{
            await this.setState(current => ({selected: [...current.selected,pick]}))
            await this.setState(current => ({toSelect: [...this.state.selected]}))
            if(this.state.toSelect.length>1){
                await this.setState(current => ({selected: []}))
                await this.setState({select: [this.state.toSelect[0],this.state.toSelect[1]]}) 
                await this.setState((state)=> {
                    state.toSelect.splice(0,2)
                return {toSelect: state.toSelect};})
            }
            else{
                this.end()
            }
            
        }
    }
    async end(){
        this.setState({winner: this.state.selected[0]});
        document.getElementById('Selection').style.display = 'none';
        document.getElementById('Results').style.display= 'flex';
        await this.setState(current => ({toSelect: []}));
        await this.setState(current => ({selected: []}));
        await this.setState(current => ({select: []}));
    }
    async restart(){
        document.getElementById('Results').style.display= 'none';
        document.getElementById('Map').style.display= 'none';
        document.getElementById('Menu').style.display = 'flex';
        this.setState({winner:''});
    }
    async map(){
       
        const src = `https://www.mapquest.com/search/${this.state.winner}`;
        document.getElementById('frame').src = src;
        document.getElementById('Results').style.display= 'none';
        document.getElementById('Map').style.display= 'flex';
        
        
       
    }
   
    render(){
        return(
            <div className="Picker">
                <div className="Menu" id="Menu">
                    <h2>Select Your Food Choices</h2>
                    <ul id="List">
                        {this.state.choices.map(choice =>{
                            return <li id={choice} key={choice}><h3>{choice}</h3> <button onClick={()=>this.handleRemove(choice)}>-</button></li>
                        
                        })}
                    </ul>
                    <div className="Adder">
                        <input placeholder="Add Food Choice" onChange={this.handleTermChange} onKeyPress={this.handleKeypress}></input>
                        <button onClick={this.handleAdd}>+</button>
                    </div>
                    <div id='start'><button onClick={this.start}>Start Selection Process</button></div>
                </div>
                <div className="Selection"id='Selection'>
                    <h2>Which would you prefer today?</h2>
                    <div id="Cards">
                        {
                            this.state.select.map(pick =>{
                                return <div key={pick+'-pick'} id={pick}><button onClick={()=>this.pick(pick)}>{pick}</button></div>
                            })
                        }
                    </div>
                        
                </div>
                <div id="Results">
                    <h2 id="Winner">Today's food choice is {this.state.winner}!</h2>
                    <div id="Options"><button onClick={this.restart}>Make a new food choice</button><button onClick={this.map}>Find {this.state.winner} places near you</button></div>
                </div>
                <div id="Map">
                        <button onClick={this.map}>Map not showing? RELOAD</button>
                        <Map/>
                        <button onClick={this.restart}>Nothing Near By? Make A New Selection</button>
                </div>
                
                        
            </div>
            
            
        )
    }
}
export default Picker;