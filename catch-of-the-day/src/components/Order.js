import React from "react";
import { formatPrice } from '../helpers';

class Order extends React.Component{
    // this needs to be arrow function or else it wont work. 
    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        //need to check if fish and a status exist not just status. 
        const isAvailable = fish && fish.status === 'available';
        // returning null will render nothing to the component. 
        if(!fish) return null;

        if(!isAvailable){
            return <li key={key}>
                {fish ? fish.name : 'fish'} is no longer available. 
            </li>;
        }
        return <li key={key}>
            {count} lbs {fish.name}

            {formatPrice(count * fish.price)}
        </li>
    }
    render(){

        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if(isAvailable){
                return prevTotal + count * fish.price;
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap"> 
                <h2> Order </h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;