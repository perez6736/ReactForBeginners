import React from "react"; 
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    }
    addFish = fish => {
        //1. take a copy of the existing state 
        //do not edit the state directly because that would be a mutation and thats bad. 
        const fishes = {...this.state.fishes}
        //2. add new fish to the fishes variable - add date.now to name of the fish object
        fishes[`fish${Date.now()}`] = fish;
        //3. set the new fishes object to state 
        this.setState({
            fishes
        });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu"> 
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish key={key} 
                                details={this.state.fishes[key]} 
                            />
                        ))}
                    </ul>
                </div>
                <Order />
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;