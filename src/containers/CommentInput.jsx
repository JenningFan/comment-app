import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentInput from '../components/CommentInput';
import { connect } from 'react-redux';
import { addComment } from '../reducers/comments';

class CommentInputContainer extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        comments: PropTypes.array
    }

    constructor() {
        super()
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({
                username
            })
        }
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    handleOnAddComment(comment) {
        if (!comment) {
            return
        }
        if (!comment.userName) {
            return alert('请输入用户名')
        }
        if (!comment.content) {
            return alert('请输入评论内容')
        }

        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render() {
        return (
            <CommentInput
                username={this.state.username}
                onSubmit={this.handleOnAddComment.bind(this)}
                onUsernameBlur={this._saveUsername}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }

    }
}

CommentInputContainer = connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)
export default CommentInputContainer;
