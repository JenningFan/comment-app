import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData'

class CommentInput extends Component {

    static propTypes = {
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            userName: props.data || '',
            content: ''
        }
    }

    componentDidMount() {
        this.textarea.focus()
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
    handleUsernameBlur(event) {
        this.props.saveData(event.target.value)
    }
    handleSubmit() {
        //监听onSubmit，如果父组件有使用名为onSubmit的prop，就执行传入的回调函数，并将userName，content作为入参传过去
        if (this.props.onSubmit) {
            const {userName, content} = this.state
            this.props.onSubmit({
                userName,
                content,
                createdTime: Date.now()
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
                        <input
                            value={this.state.userName}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>
                        评论内容：
                    </span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

CommentInput = wrapWithLoadData(CommentInput, 'username')

export default CommentInput