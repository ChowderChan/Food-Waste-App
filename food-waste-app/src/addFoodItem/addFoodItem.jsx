import React, { useState } from "react";
import './addFoodItem.css'

const AddFoodItem = () => {

    const options = [

        {category:"Vegan"},
        {category:"Bio"},
        {category:"Fast-Food"},
        {category:"Without expire date"}
    ]

    const [option, setCategory] = useState('Category')
    const changeOption = (event) => {

        setCategory(event.target.value)
    }

    return(
        <div className="containerFridgeAdd">
            <div className="headerFridgeAdd">
                <div className="textFridgeAdd">Add item in fridge list</div>
                <div className="underLineFridgeAdd"></div>
            </div>
            <div className="inputsFridgeAdd">
                <div className="inputFridgeAdd">
                    <select value={option} onChange={changeOption}>
                        <option>Category</option>
                        {options.map(ctr => (
                            <option value={ctr.category}>{ctr.category}</option>
                        ))}
                    </select>
                </div>
                <div className="inputFridgeAdd">
                    <input type="text" placeholder="Name" />
                </div>
                <div className="inputFridgeAdd">
                    <input type="date"/>
                </div>
                <div className="inputFridgeAddAbout">
                    <textarea placeholder="About" />
                </div>
            </div>
            <div className="submitContainerFridgeAdd">
                <div className="add">Add</div>
            </div>
        </div>
    )
}

export default AddFoodItem