import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetails extends Component{
        constructor(props) {
                super(props);
        }

       
        render() {
                console.log(this.props.dish);
                if (this.props.dish != null) {
                        const commentBlock = this.props.dish.comments.map((c) => {
                                return (
                                        <CardText key={c.id} className="col-12">
                                                <p>{c.comment}</p>
                                                <p>--{c.author}, {new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(c.date)))}</p>
                                        </CardText>

                                );
                        });

                        return (
                                <div className="container">
                                        <div className="row">
                                                <div className="col-12 col-md-5">
                                                        <Card>
                                                                <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                                                                <CardBody>
                                                                        <CardTitle>{this.props.dish.name}</CardTitle>
                                                                        <CardText>{this.props.dish.description}</CardText>
                                                                </CardBody>
                                                        </Card>
                                                </div>
                                                <div className="col-12 col-md-5">
                                                        <h3>Comments</h3>
                                                        {commentBlock}
                                                </div>
                                        </div>
                                </div>
                        );
                }

                else {
                        return (
                                <div></div>
                        );
                }
                
                
        }
}

export default DishDetails;