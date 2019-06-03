import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

        constructor(props) {
                super(props);
                this.state = {
                        dishes: DISHES,
                        selectedDish: null
                };
        }

        onDishSelect(dishId) {
                this.setState({ selectedDish: dishId });
        }

        render() {
                console.log("The selected Dish: " + this.state.selectedDish);
                return (
                        <div>
                                <Header/>
                                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                                {console.log("This is the selected dish after clicking: " + this.state.selectedDish)}
                                <DishDetails dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
                                <Footer/>
                        </div>
                );
        }
}

export default Main;