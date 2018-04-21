import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {

    //声明一个回调函数，最终会在子组件CommentInput的作用域内被调用执行，相当于通过该函数去接收子组件传递的数据，实现父子组件通信
    handleSubmitComment(comment) {
        console.log(comment)
    }
    render() {
        return (
            <div className='wrapper'>
            {/* 通过props给子组件CommentInput传递class CommentApp中定义的函数作为回调函数 */}
              <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
              <CommentList />
            </div>
        )
    }
}
export default CommentApp

