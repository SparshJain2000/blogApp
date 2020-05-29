import React, { Component, useState } from "react";
import axios from "axios";
import {
    Card,
    CardImg,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
    CardFooter,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Spinner,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Loading = require("react-loading-animation");
const Blog = ({ blog, user }) => {
    return (
        <div className='col-12 col-md-6 col-lg-4 mb-5'>
            <a className='text-decoration-none'>
                <Card className='p-1 m-1'>
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
                        <CardText className='text-black-50'>
                            {blog.body.substring(0, 30)}
                            {" ..."}
                        </CardText>
                    </CardBody>
                    {user === null ? (
                        ""
                    ) : user._id === blog.author.id ? (
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
            </a>
        </div>
    );
};
const Blogs = ({ blogs, user }) => {
    console.log(blogs);
    console.log(user);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return blogs.map((blog) => {
        return (
            <div className='col-12 col-md-6 col-lg-4 mb-5'>
                <Link
                    to={{
                        pathname: `/blog/${blog._id}`,
                        blog: { blog },
                    }}
                    className='text-decoration-none'>
                    <Card className='p-1 m-1' id='cards'>
                        <CardImg
                            top
                            width='100%'
                            src={blog.image}
                            alt='Card image cap'
                            className='img-thumbnail'
                        />
                        <CardBody>
                            <CardTitle className='text-primary'>
                                <h5>{blog.title}</h5>
                            </CardTitle>
                            <CardSubtitle className='text-dark'>
                                {"-"}
                                <em>@{blog.author.username}</em>
                            </CardSubtitle>
                            <CardText className='text-black-50'>
                                {blog.body.substring(0, 30)}
                                {" ..."}
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        );
    });
    // return blogList;
};
let timer = null;
export default class blogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null,
            isModalOpen: false,
            title: "",
            body: "",
            image: "",
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.onbodyChange = this.onbodyChange.bind(this);
        this.ontitleChange = this.ontitleChange.bind(this);
        this.onimgChange = this.onimgChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios
            .get("/blogs")
            .then((res) => this.setState({ blogs: res.data.blogs }))
            .catch((err) => {
                // console.log(err.err);
                // if (err.err == "Not Logged in")
                window.location = "/login";
            });
        console.log(this.props.user);
    }
    ontitleChange(e) {
        this.setState({
            title: e.target.value,
        });
        console.log(e);
    }
    onbodyChange(e) {
        this.setState({
            body: e.target.value,
        });
        console.log(e);
    }
    onimgChange(e) {
        this.setState({
            image: e.target.value,
        });
        console.log(e);
    }
    onSubmit(e) {
        e.preventDefault();
        const blog = {
            title: this.state.title,
            body: this.state.body,
            image: this.state.image,
        };
        console.log(blog);
        axios
            .post("/blogs", blog)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    blogs: [...this.state.blogs, res.data.blog],
                });
            })
            .catch((err) => console.log(err));

        this.toggleModal();
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    render() {
        return (
            <div
                className='container row'
                style={{
                    marginLeft: "10vw",
                    marginRight: "10vw",
                }}>
                <div className='row mt-5 col-8'>
                    {this.state.blogs ? (
                        <Blogs
                            blogs={this.state.blogs}
                            user={this.props.user}
                        />
                    ) : (
                        <ReactLoading
                            type={"spin"}
                            color={"orange"}
                            height={"100%"}
                            width={"40%"}
                            className='loading'
                        />
                    )}
                    {/* <Modal
                    isOpen={modal}
                    toggle={toggle}
                    autoFocus={true}
                    scrollable={true}
                    z-index={120}
                    fade={true}
                    backdrop={false}>
                    <ModalHeader toggle={toggle}>{blog.title}</ModalHeader>
                    <ModalBody>
                        <img
                            src={blog.image}
                            alt='blog image'
                            className='img-fluid'
                        />
                        {blog.body}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={toggle}>
                            Do Something
                        </Button>{" "}
                        <Button color='secondary' onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal> */}
                </div>
                <div className='col-12 col-md-4 mt-5'>
                    <Button
                        style={{ width: "100%" }}
                        className='btn btn-lg p-3'
                        color='primary'
                        onClick={this.toggleModal}>
                        Add Blog
                    </Button>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    fade={false}
                    toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Add a blog
                    </ModalHeader>
                    <Form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor='title'>title</Label>
                                <Input
                                    type='text'
                                    id='title'
                                    onChange={this.ontitleChange}
                                    name='title'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='imageURL'>imageURL</Label>
                                <Input
                                    type='text'
                                    id='imageURL'
                                    onChange={this.onimgChange}
                                    name='imageURL'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='body'>body</Label>
                                <Input
                                    type='textarea'
                                    id='body'
                                    onChange={this.onbodyChange}
                                    name='body'></Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                value='submit'
                                color='primary'>
                                Add BLOG
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
