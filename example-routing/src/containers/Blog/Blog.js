import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import Posts from './Posts/Posts'
// import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import asyncComponent from '../../hoc/asyncComponent'
import './Blog.css';

const AsyncComponent = asyncComponent(() => {
    return import('./NewPost/NewPost');
})
class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        let newPostRoute = this.state.auth ? <Route path='/new-post' exact component={AsyncComponent}/> : null
        return (
            <div className= "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to='/posts'>Posts</NavLink></li>
                            <li><NavLink exact to='/new-post'>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    { newPostRoute }
                    <Route path='/posts' exact component={Posts}/>
                    <Route path='/posts/:postId' exact component={FullPost}/>
                    <Route render={() => <h1>Not found</h1> /* Handle 404 request*/ }/>
                    {/*<Redirect from="/" to="/posts"/> Using redirect*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;