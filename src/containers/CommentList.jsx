import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import CommentList from '../components/CommentList';
import { initComments, deleteComment } from '../reducers/comments';
import { connect } from 'react-redux';


//对于components/CommentList组件，可以看到它接受两个参数：comments和onDeleteComment。说明需要一个Smart组件来负责把comments数据传给它，并且还得响应它删除评论的请求。
class CommentListContainer extends Component {

    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func,
        initComments: PropTypes.func
    }

    componentWillMount() {
        //初始化评论
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
        //this.props.initComments 是connect传进来的，可以帮我们把数据初始化到state里面去
        this.props.initComments(comments)
    }

    handleDeleteComment(commentIndex) {
        const { comments } = this.props.comments
        const newComments = [...comments.slice(0, commentIndex), ...comments.slice(commentIndex + 1)]
        //保存最新的评论列表到 LocalStorage
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
