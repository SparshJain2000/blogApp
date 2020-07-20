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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faHeart,
    faUserCircle,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { likes: this.props.blog.likes, isOpen: false };
        this.showLikes = this.showLikes.bind(this);
    }
    showLikes() {
        this.setState({ isOpen: !this.state.isOpen });
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
                                {blog.likes.length}
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
                                        onClick={this.toggleLike}
                                    />
                                ) : (
                                    <span
                                        className='float-right '
                                        onClick={this.toggleLike}>
                                        {/* <FontAwesomeIcon
                                            style={{
                                                color: "rgba(0,0,0,0.2)",
                                                cursor: "pointer",
                                            }}
                                            icon={faHeart}
                                            className=''
                                        /> */}
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
                        <div className='row justify-content-center'>
                            <Button
                                className='btn btn-sm col-5 mr-1'
                                color='success'>
                                <Link
                                    to={{
                                        pathname: `/blog/${blog._id}`,
                                        blog: { blog },
                                    }}
                                    className='text-decoration-none text-white'>
                                    Read More
                                </Link>
                            </Button>
                            <Button
                                className='col-5 btn btn-sm ml-1'
                                color='danger'
                                onClick={this.showLikes}>
                                Likes
                            </Button>
                        </div>
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
                            {this.state.isOpen && (
                                <div className='likes m-3'>
                                    <h6>
                                        <FontAwesomeIcon
                                            className='text-danger'
                                            icon={faHeart}
                                        />{" "}
                                        {this.state.likes.length} Likes
                                    </h6>
                                    <ul className='list-group list-group-flush'>
                                        {this.state.likes.map((user) => (
                                            <li className='list-group-item py-2 pl-0'>
                                                <FontAwesomeIcon
                                                    icon={faUserCircle}
                                                    // className='text-danger'
                                                />
                                                {"  "}
                                                {user.username}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardFooter>
                    )}
                </Card>
            </div>
        );
    }
}
const Blogs = ({ blogs }) => {
    return blogs.map((blog) => {
        return <Blog key={blog._id} blog={blog} />;
    });
};
export default class Myblogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null,
            likes: 0,
        };
    }
    componentDidMount() {
        axios
            .get("/api/blogs/my")
            .then(({ data: { blogs } }) => {
                let a = 0;
                blogs.forEach((blog) => {
                    a += blog.likes.length;
                });
                this.setState({ blogs: blogs, likes: a });
            })
            .catch((err) => console.log(err.response));
    }
    render() {
        return (
            <div>
                <div className='row mr-auto ml-3 mb-1 mt-1'>
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
                <div
                    className='row pt-4 justify-content-center'
                    style={{
                        marginLeft: "5vw",
                        width: "90vw",
                    }}>
                    {this.state.blogs ? (
                        <Blogs blogs={this.state.blogs} />
                    ) : (
                        <div className='btn btn-lg btn-danger'>
                            404 : No Blogs Found
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
