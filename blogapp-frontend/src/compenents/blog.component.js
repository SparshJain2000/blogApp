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
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    CardFooter,
} from "reactstrap";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faHeart,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
export default class blog extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.onbodyChange = this.onbodyChange.bind(this);
        this.ontitleChange = this.ontitleChange.bind(this);
        this.onimgChange = this.onimgChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteBlog = this.deleteBlog.bind(this);
        this.state = {
            image: "",
            title: "",
            body: "",
            author: "",
            data: "",
            likes: [],
            isModalOpen: false,
            loaded: false,
        };
    }
    componentDidMount() {
        // console.log(this.props.location);
        if (this.props.location.blog) {
            this.setState({
                image: this.props.location.blog.blog.image,
                title: this.props.location.blog.blog.title,
                body: this.props.location.blog.blog.body,
                author: this.props.location.blog.blog.author,
                date: this.props.location.blog.blog.date,
                likes: this.props.location.blog.blog.likes,
                loaded: true,
            });
        }
        if (!this.props.location.blog) {
            axios
                .get(`/api/blogs/${this.props.match.params.id}`)
                .then(({ data }) => {
                    this.setState({
                        image: data.image,
                        title: data.title,
                        body: data.body,
                        author: data.author,
                        date: data.date,
                        likes: data.likes,
                        loaded: true,
                    });
                })
                .catch((err) => console.log({ err: err }));
        }
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    ontitleChange(e) {
        this.setState({
            title: e.target.value,
        });
    }
    onbodyChange(e) {
        this.setState({
            body: e.target.value,
        });
    }
    onimgChange(e) {
        this.setState({
            image: e.target.value,
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const updatedBlog = {
            title: this.state.title,
            body: this.state.body,
            image: this.state.image,
        };
        axios
            .put(`/api/blogs/${this.props.match.params.id}`, updatedBlog)
            .then(({ data: { blog } }) => {
                // this.setState({
                //     title: blog.title,
                //     image: blog.image,
                //     body: blog.body,
                //     date: blog.date,
                // });
                console.log(blog);
            })
            .catch((err) => console.log(err));

        this.toggleModal();
    }
    deleteBlog() {
        axios
            .delete(`/api/blogs/${this.props.match.params.id}`)
            .then(({ data }) => {
                console.log(data);
                window.location = "/";
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className='pt-2 px-3'>
                <div className='row mr-auto ml-0 mb-4 mt-0'>
                    <Button
                        color='primary'
                        size='lg'
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                        }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
                {!this.state.loaded ? (
                    <ReactLoading
                        type={"spin"}
                        color={"orange"}
                        height={"100vh"}
                        width={"40%"}
                        className='loading'
                    />
                ) : (
                    <Card id='blog' className='p-2 col-12 singleBlog'>
                        <CardImg
                            src={this.state.image}
                            alt='Card image cap'
                            className='img-thumbnail'
                        />
                        <CardBody>
                            <CardTitle className='text-primary'>
                                <h5>
                                    {this.state.title}
                                    <span className='float-right text-secondary'>
                                        {"-"}
                                        <em>@{this.state.author.username}</em>
                                    </span>
                                </h5>
                            </CardTitle>
                            {this.state.date !== "" && (
                                <CardSubtitle className='text-dark'>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className='mr-2'
                                    />
                                    {new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                    }).format(Date.parse(this.state.date))}
                                    <span className='float-right'>
                                        <FontAwesomeIcon
                                            className='text-danger'
                                            icon={faHeart}
                                        />{" "}
                                        {this.state.likes.length}
                                    </span>
                                </CardSubtitle>
                            )}
                            <CardText>
                                <br />
                                {this.state.body}
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            {this.props.user !== null &&
                                this.props.user._id ===
                                    this.state.author.id && (
                                    <div
                                        style={{ display: "flex" }}
                                        className='p-1'>
                                        <Button
                                            className='btn btn-danger mr-1'
                                            style={{ width: "48%" }}
                                            onClick={this.deleteBlog}>
                                            Delete
                                        </Button>{" "}
                                        <Button
                                            className='btn btn-warning ml-1'
                                            style={{ width: "48%" }}
                                            onClick={this.toggleModal}>
                                            Edit
                                        </Button>
                                    </div>
                                )}
                        </CardFooter>
                    </Card>
                )}
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
                                    value={this.state.title}
                                    name='title'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='imageURL'>imageURL</Label>
                                <Input
                                    type='text'
                                    id='imageURL'
                                    onChange={this.onimgChange}
                                    value={this.state.image}
                                    name='imageURL'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='body'>body</Label>
                                <Input
                                    type='textarea'
                                    id='body'
                                    onChange={this.onbodyChange}
                                    value={this.state.body}
                                    name='body'
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                value='submit'
                                color='primary'>
                                UPDATE BLOG
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
