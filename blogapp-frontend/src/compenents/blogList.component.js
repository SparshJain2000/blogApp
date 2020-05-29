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
const Blogs = ({ blogs, user }) => {
    console.log(blogs);
    console.log(user);
    const blogList = blogs.map((blog) => {
        return (
            <div className='col-12 col-md-6 col-lg-4' id='blog'>
                <Card className='m-1 p-2'>
                    <CardImg
                        top
                        width='100%'
                        src={blog.image}
                        alt='Card image cap'
                        className='img-thumbnail'
                    />
                    <CardBody>
                        <CardTitle className='text-primary'>
                            <strong>{blog.title}</strong>
                        </CardTitle>
                        <CardSubtitle>
                            {/* {this.state.author.username} */}
                        </CardSubtitle>
                        <CardText>{blog.body}</CardText>
                        {user === null ? (
                            ""
                        ) : user._id === blog.author.id ? (
                            <div>
                                <Button className='btn btn-danger'>
                                    Delete
                                </Button>{" "}
                                <Button className='btn btn-warning'>
                                    Edit
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                    </CardBody>
                </Card>
            </div>
        );
    });
    return blogList;
};
export default class blogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null,
        };
    }
    componentDidMount() {
        axios
            .get("/blogs")
            .then((res) => this.setState({ blogs: res.data.blogs }))
            .catch((err) => console.log(err));
        console.log(this.props.user);
    }

    render() {
        return (
            <div
                className='row mt-5'
                style={{ marginLeft: "20vw", marginRight: "20vw" }}>
                {this.state.blogs ? (
                    <Blogs blogs={this.state.blogs} user={this.props.user} />
                ) : (
                    "Not logged in"
                )}
            </div>
        );
    }
}
