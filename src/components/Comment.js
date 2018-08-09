import React, { Component } from 'react';
import PropTypes from "prop-types";

class Comment extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    constructor() {
        super()
        this.state = {
            timeString: ''
        }
    }

    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(this._updateTimeString.bind(this), 5000)
    }
    
    _updateTimeString() {
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000
        const timeString = duration > 60 ? `${Math.round(duration / 60)} 分钟前` : `${Math.round(Math.max(duration, 1))} 秒前`
        this.setState({
            timeString
        })
    }

    _getProcessedContent(content) {
        //手动地把HTML标签进行转义
        return content.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;')
                      //\s\S匹配所有字符，+匹配至少出现一次，?非贪婪算法，g全局匹配content中形如`xxx`的字符串
                      .replace(/`([\s\S]+?)`/g, '<code>$1</code>')
    }

    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.userName} </span>：
                </div>
                {/* <p>{this.props.comment.content}</p> */}
                <p dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(this.props.comment.content)
                }} />
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>删除</span>
            </div>
        )
    }
}

export default Comment;