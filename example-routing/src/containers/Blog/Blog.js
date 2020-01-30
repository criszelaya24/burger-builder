import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import './Blog.css';

class Blog extends Component {

    state = {
        auth: false
    }

    render () {
        let newPostRoute = this.state.auth ? <Route path='/new-post' exact component={NewPost}/> : null
        return (
            <div className= "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to='/'>Posts</NavLink></li>
                            <li><NavLink exact to='/new-post'>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    { newPostRoute }
                    <Route path='/posts' exact component={Posts}/>
                    <Route path='/posts/:postId' exact component={FullPost}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;