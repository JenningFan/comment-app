import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        onUsernameBlur: PropTypes.func,
        username: PropTypes.string
    }

    static defaultProps = {
        username: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            //从props上取username字段
            userName: props.username,
            content: ''
        }
    }

    // componentWillMount() {
    //     this._loadUsername()
    // }

    componentDidMount() {
        this.textarea.focus()
    }

    // _saveUsername(username) {
    //     localStorage.setItem('username', username)
    // }

    // _loadUsername() {
    //     const username = localStorage.getItem('username')
    //     if (username) {
    //         this.setState({
    //             userName: username
    //         })
    //     }
    // }

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
        if (this.props.onUsernameBlur) {
            this.props.onUsernameBlur(event.target.value)
        }
    }
    handleSubmit() {
        //监听onSubmit，如果父组件有使用名为onSubmit的prop，就执行传入的回调函数，并将userName，content作为入参传过去
        if (this.props.onSubmit) {
            const { userName, content } = this.state
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
export default CommentInput