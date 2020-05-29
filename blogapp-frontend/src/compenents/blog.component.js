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
        axios
            .get(`http://localhost:8080/blogs/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    title: res.data.title,
                    body: res.data.body,
                    image: res.data.image,
                    author: res.data.author,
                });
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div>
                <Card>
                    <CardImg
                        top
                        width='100%'
                        src={this.state.image}
                        alt='Card image cap'
                    />
                    <CardBody>
                        <CardTitle>{this.state.title}</CardTitle>
                        <CardSubtitle>
                            {/* {this.state.author.username} */}
                        </CardSubtitle>
                        <CardText>{this.state.body}</CardText>
                        <Button>Delete</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
