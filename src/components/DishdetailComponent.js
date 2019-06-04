import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderComments({ comments }) {
        console.log(comments);
        if (comments != null) {
                var commentsBlock = comments.map((c) => {
                        return (
                                <CardText className="col-12">
                                        <p>{c.comment}</p>
                                        <p>--{c.author}, {new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(c.date)))}</p>
                                </CardText>
                        )
                });

                return (
                        commentsBlock
                );
        }
}

function RenderDish({ dish }) {
        return (
                <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                        </CardBody>
                </Card>
        );

}

const DishDetails = (props) => {
        
        if (props.dish != null) {
                return (
                        <div className="container">
                                <div className="row">
                                        <Breadcrumb>
                                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                        </Breadcrumb>
                                
                                        <div className="col-12">
                                                <h3>{props.dish.name}</h3>
                                                <hr/>
                                        </div>
			        </div>
                                <div className="row">
                                        <div className="col-12 col-md-5">
                                                <RenderDish dish={props.dish} />
                                        </div>
                                        <div className="col-12 col-md-5">
                                                <h3>Comments</h3>
                                                <RenderComments comments={props.comments} />
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
        
export default DishDetails;
        

