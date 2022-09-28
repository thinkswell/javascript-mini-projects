import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import style
import "./stylesheets/index.css";

//Import all components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Landing = lazy(() => import("./components/Landing"));
const Post = lazy(() => import("./components/Post"));
const CreatePost = lazy(() => import("./components/CreatePosts"));
const EditPost = lazy(() => import("./components/EditPost"));
const PostsList = lazy(() => import("./components/PostsList"));
const Login = lazy(() => import("./components/Login"));
const About = lazy(() => import("./components/About"));

const renderLoader = () => (
    <div className="spinner-container">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const App = () => (
    <div className="container">
        <Router>
            <Navbar />
            <Suspense fallback={renderLoader()}>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/posts" exact component={PostsList} />
                    <Route path="/posts/new/" exact component={CreatePost} />
                    <Route path="/posts/:id" exact component={Post} />
                    <Route path="/posts/:id/edit" exact component={EditPost} />
                    <Route path="/login" component={Login} />
                    <Route path="/about" component={About} />
                </Switch>
            </Suspense>
            <Footer />
        </Router>
    </div>
);

export default App;
