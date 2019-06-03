import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


class Menu extends Component{
    
    constructor(props) {
        super(props);
    }   
    
	render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                    <Card key={dish.id} className="col-12 col-md-5 m-1" onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay body className="ml-5">
                            <CardTitle>{dish.name}</CardTitle>
                         </CardImgOverlay>
                    </Card>   
            );
        });

         return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        ); 
    }
}
export default Menu;