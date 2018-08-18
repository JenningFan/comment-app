//action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

//reducer
const commentsReducer = (state, action) => {
    if (!state) {
        state = {
            //初始化为空数组
            comments: []
        }
    }
    switch (action.type) {
        //初始化评论
        case INIT_COMMENTS:
            return {
                comments: action.comments
            }
        //新增评论
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            }
        //删除评论
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state
    }
}

//action creators
const initComments = (comments) => {
    return {
        type: INIT_COMMENTS,
        comments
    }
}
const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}
const deleteComment = (commentIndex) => {
    return {
        type: DELETE_COMMENT,
        commentIndex
    }
}

export default commentsReducer
export { initComments, addComment, deleteComment }