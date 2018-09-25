import React from "react";

class EditFishForm extends React.Component {
    handlChange = (event) => {
        //update that fish 
        //1. take copy of current fish
        //es6 computed property names ---
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };

        this.props.updateFish(this.props.index, updatedFish);

    }


    render() {
        return(
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handlChange} value={this.props.fish.name}/>
                <input type="text" name="price" onChange={this.handlChange} value={this.props.fish.price}/>
                <select type="text" name="status" onChange={this.handlChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handlChange} value={this.props.fish.desc}/>
                <img src={this.props.fish.image} alt="fish img"/>
            </div>
        )
    }
}

export default EditFishForm;