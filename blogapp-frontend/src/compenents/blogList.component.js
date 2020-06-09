import React, { Component } from "react";
import axios from "axios";
import {
    Card,
    CardImg,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardImgOverlay,
    CardText,
    Button,
    CardFooter,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            likes: this.props.blog.likes.length,
        };
        this.toggleLike = this.toggleLike.bind(this);
    }
    toggleLike() {
        !this.state.liked
            ? axios
                  .put(`/blogs/${this.props.blog._id}/like`)
                  .then((res) => {
                      this.setState({
                          liked: true,
                          likes: res.data.likes.length,
                      });
                  })
                  .catch((err) => console.log(err))
            : axios
                  .put(`/blogs/${this.props.blog._id}/unlike`)
                  .then((res) => {
                      this.setState({
                          liked: false,
                          likes: res.data.likes.length,
                      });
                  })
                  .catch((err) => console.log(err));
    }
    componentDidMount() {
        for (let user of this.props.blog.likes)
            if (user.id === this.props.user._id) {
                this.setState({
                    liked: true,
                });
                break;
            }
    }

    render() {
        const blog = this.props.blog;

        return (
            <div
                className='col-12 col-md-6 col-lg-4 col-xl-3 mb-5'
                key={blog._id}>
                <Card className='p-1 m-1' id='cards'>
                    <Card>
                        <CardImg
                            top
                            width='100%'
                            src={blog.image}
                            alt='Card image cap'
                            className='img-fluid'
                        />
                        <CardImgOverlay>
                            <h3>
                                <FontAwesomeIcon
                                    className='text-danger'
                                    icon={faHeart}
                                />{" "}
                                {this.state.likes}
                            </h3>
                        </CardImgOverlay>
                    </Card>

                    <CardBody>
                        <CardTitle className='text-primary'>
                            <h5>
                                {blog.title}
                                {this.state.liked ? (
                                    <span
                                        className='float-right '
                                        style={{ cursor: "pointer" }}
                                        onClick={this.toggleLike}>
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className='text-danger'
                                        />
                                    </span>
                                ) : (
                                    <span
                                        className='float-right '
                                        onClick={this.toggleLike}>
                                        <FontAwesomeIcon
                                            style={{
                                                color: "rgba(0,0,0,0.2)",
                                                cursor: "pointer",
                                            }}
                                            icon={faHeart}
                                            className=''
                                        />
                                    </span>
                                )}
                            </h5>
                        </CardTitle>
                        <CardSubtitle>
                            {"-"}
                            <em>@{blog.author.username}</em>
                        </CardSubtitle>
                        <br />
                        <CardText className=''>
                            {blog.body.substring(0, 50)}
                            {" ..."}
                        </CardText>
                        <Link
                            to={{
                                pathname: `/blog/${blog._id}`,
                                blog: { blog },
                            }}
                            className='text-decoration-none'>
                            <Button className='btn btn-sm' color='success'>
                                Read More
                            </Button>
                        </Link>
                    </CardBody>
                    {blog.date && (
                        <CardFooter className='small '>
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
                            }).format(Date.parse(blog.date))}
                            {/* {blog.date} */}
                        </CardFooter>
                    )}
                </Card>
            </div>
        );
    }
}
const Blogs = ({ blogs, user }) => {
    return blogs.map((blog) => {
        return <Blog key={blog._id} blog={blog} user={user} />;
    });
};
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
            .then(({ data: { blogs } }) => {
                blogs.sort((a, b) =>
                    a.likes.length < b.likes.length
                        ? 1
                        : b.likes.length < a.likes.length
                        ? -1
                        : 0
                );
                this.setState({ blogs: blogs });
            })
            .catch((err) => {
                console.log(err);
                window.location = "/login";
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
        const blog = {
            title: this.state.title,
            body: this.state.body,
            image: this.state.image,
        };
        axios
            .post("/blogs", blog)
            .then(({ data: { blog } }) => {
                this.setState({
                    blogs: [blog, ...this.state.blogs],
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
            <div className=''>
                <Button
                    color='danger'
                    onClick={this.toggleModal}
                    style={{
                        marginLeft: "15vw",
                        marginTop: "2vh",
                        width: "70vw",
                    }}>
                    Add a BLOG
                </Button>
                <div
                    className='row pt-4'
                    style={{
                        marginLeft: "5vw",
                        width: "90vw",
                    }}>
                    {this.state.blogs ? (
                        <Blogs
                            blogs={this.state.blogs}
                            user={this.props.user}
                            liked={this.state.like}
                            toggleLike={this.toggleLike}
                        />
                    ) : (
                        <ReactLoading
                            type={"spin"}
                            color={"orange"}
                            height={"100vh"}
                            width={"40%"}
                            className='loading'
                        />
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
            </div>
        );
    }
}
