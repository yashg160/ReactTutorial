import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Input, Label, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderComments({ comments, addComment, dishId }) {
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
                        <div>
                                {commentsBlock}
                                <CommentForm dishId={dishId} addComment={addComment}/>
                        </div>
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
        
        if (props.isLoading) {
                return (
                        <div className="container">
                                <div className="row">
                                        <Loading />
                                </div>
                        </div>
                );
        }

        else if (props.errMess) {
                return (
                        <div className="container">
                                <div className="row">
                                        <h4>{props.errMess}</h4>
                                </div>
                        </div>
                );
        }

        else if (props.dish != null) {

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
                                                <RenderComments comments={props.comments}
                                                        addComment={props.addComment}
                                                        dishId={props.dish.id}/>
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
    

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component{
        
        constructor(props){
                super(props);
                this.state = {
                        isModalOpen: false
                };

                this.toggleModal = this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
                this.setState({
                        isModalOpen: !this.state.isModalOpen
                });
        }

        handleSubmit(values){
                this.toggleModal();
                this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
                console.log("dishId: " + this.props.dishId);
        }

        render(){
                return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"/> Submit Comment
                </Button>

                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={4}>Rating</Label>
                                        <Col className="col">
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="author" md={4}>Your name</Label>
                                        <Col className="col">
                                            <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                            <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={4}>Your feedback</Label>
                                        <Col className="col">
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                            <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
        }
}
