import React from "react"; 
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from "../base"

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        //need to reinstate the local storage
        const localstorageRef = localStorage.getItem(this.props.match.params.storeID);
        if(localstorageRef){
            console.log(localstorageRef);
            this.setState({ order: JSON.parse(localstorageRef) });
        }
        // this uses the rebase library to sync state 
        this.ref = base.syncState(`${this.props.match.params.storeID}/fishes`,{
            context: this,
            state: "fishes"
        });
    }

    //we need to update loval storage whenever the order is updated. 
    componentDidUpdate(){
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order));
        console.log("updated!");
    }

    //need to unmount because then rebase will keep listening and will cause memory leaks. 
    componentWillUnmount(){
        base.removeBinding(this.ref);
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

    addToOrder = (key) => {
        //1. take copy of state 
        const order = {...this.state.order}
        //2. either add the order or create key and make it 1.
        if(typeof order[key] === 'undefined'){
            order[key] = 1;
        }
        else{
            order[key] = order[key]+1;
        }
        //3. set state
        this.setState({ order });
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
                            <Fish 
                                key = {key}
                                index = {key}
                                details={this.state.fishes[key]}
                                addToOrder = {this.addToOrder} 
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;