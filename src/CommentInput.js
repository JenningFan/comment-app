import React, { Component } from 'react';

class CommentInput extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            content: ''
        }
    }
    handleUsernameChange(event) {
        this.setState({
            userName: event.target.value
        })
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit() {
        //监听onSubmit，如果父组件有使用名为onSubmit的prop，就执行传入的回调函数，并将userName，content作为入参传过去
        if (this.props.onSubmit) {
            const {userName, content} = this.state
            this.props.onSubmit({
                userName,
                content
            })
        }
        this.setState({
            content: ''
        })
    }
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>
                        用户名：
                    </span>
                    <div className='comment-field-input'>
                        <input value={this.state.userName} onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>
                        评论内容：
                    </span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}
export default CommentInput