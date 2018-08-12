import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import CommentList from '../components/CommentList';
import { initComments, deleteComment } from '../reducers/comments';
import { connect } from 'react-redux';

class CommentListContainer extends Component {

    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func,
        initComments: PropTypes.func
    }

    componentWillMount() {
        this._loadComments()
    }

    _loadComments() {
        let comments = localStorage.getItem('comments')
        if (comments) {
            try {
                comments = JSON.parse(comments)
                if (!(comments instanceof Array)) {
                    comments = []
                }
            } catch (error) { 
                comments = []
            }
        } else {
            comments = []
        }
        this.props.initComments(comments)
    }

    handleDeleteComment(commentIndex) {
        const { comments } = this.props.comments
        const newComments = [...comments.slice(0, commentIndex), ...comments.slice(commentIndex + 1)]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(commentIndex)
        }
    }


    render() {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)} />
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
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

CommentListContainer = connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)
export default CommentListContainer;
