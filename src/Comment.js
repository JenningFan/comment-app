import React, { Component } from 'react';
import PropTypes from "prop-types";

class Comment extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }
    
    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.userName} </span>：
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        )
    }
}

export default Comment;