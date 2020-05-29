import React, { Component } from "react";
import axios from "axios";
import {
    Card,
    CardImg,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
} from "reactstrap";
export default class blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            title: "",
            body: "",
            author: "",
        };
    }
    /*{"_id":{"$oid":"5ecfc9b5675b492ac0c86961"},"title":"My Blog","image":"","body":"this is my blog ...............","__v":{"$numberInt":"0"},"author":{"id":{"$oid":"5ecfc98a675b492ac0c8695f"},"username":"sajaljain"}} */
    componentDidMount() {
        // axios
        //     .get(`http://localhost:8080/blogs/${this.props.match.params.id}/`)
        //     .then((res) => {
        //         this.setState({
        //             title: res.data.title,
        //             body: res.data.body,
        //             image: res.data.image,
        //             author: res.data.author,
        //         });
        //         console.log(res.data);
        //     })
        //     .catch((err) => console.log(err));
        console.log(this.props.location);
        if (this.props.location.blog) {
            this.setState({
                image: this.props.location.blog.blog.image,
                title: this.props.location.blog.blog.title,
                body: this.props.location.blog.blog.body,
                author: this.props.location.blog.blog.author,
            });
        }
    }
    render() {
        return (
            <div>
                <Card
                    style={{
                        width: "50vw",
                        margin: "auto",
                    }}
                    className='mx-auto mt-3 col-12 p-1'>
                    <CardImg
                        src={this.state.image}
                        alt='Card image cap'
                        className='img-thumbnail'
                    />
                    <CardBody>
                        <CardTitle className='text-primary'>
                            <h5>{this.state.title}</h5>
                        </CardTitle>
                        <CardSubtitle className='text-dark'>
                            {"-"}
                            <em>@{this.state.author.username}</em>
                        </CardSubtitle>
                        <CardText>{this.state.body}</CardText>
                    </CardBody>
                    {this.props.user === null ? (
                        ""
                    ) : this.props.user._id === this.state.author.id ? (
                        <div style={{ display: "flex" }} className='p-1'>
                            <Button
                                className='btn btn-danger mr-1'
                                style={{ width: "48%" }}>
                                Delete
                            </Button>{" "}
                            <Button
                                className='btn btn-warning ml-1'
                                style={{ width: "48%" }}>
                                Edit
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                </Card>
            </div>
        );
    }
}
