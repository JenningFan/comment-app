import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrapWithLoadData from './wrapWithLoadData'

class CommentApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: props.data || []
        }
    }

    //声明一个回调函数，最终会在子组件CommentInput的作用域内被调用执行，相当于通过该函数去接收子组件传递的数据，实现父子组件通信
    handleSubmitComment(comment) {
        if (!comment) {
            return
        }

        if (!comment.userName) {
            return alert('请输入用户名')
        }
        if (!comment.content) {
            return alert('请输入评论内容')
        }
        //this.state.comments.push(comment) -> 这样写也可以，但是直接往state.comments数组里面插入数据其实违反了React.js的state不可直接修改的原则
        const arr = []
        arr.push(comment)
        const comments = this.state.comments.concat(arr)
        this.setState({
            comments
        })
        
        this.props.saveData(comments)
    }
    handleDeleteComment(index) {
        const comments = this.state.comments
        //删除comments数组中index下标对应的元素
        comments.splice(index, 1)
        this.setState({
            comments
        })
        this.props.saveData(comments)
    }
    render() {
        return (
            <div className='wrapper'>
                {/* 通过props给子组件CommentInput传递class CommentApp中定义的函数作为回调函数 */}
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')


export default CommentApp

