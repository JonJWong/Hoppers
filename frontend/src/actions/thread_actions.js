import * as ThreadApiUtil from "../util/thread_api_util";

export const RECEIVE_THREAD = "RECEIVE_THREAD";

export const receiveThread = (thread) => ({
  type: RECEIVE_THREAD,
  thread
});

export const createComment = (threadId, comment) => dispatch => (
  ThreadApiUtil.makeComment(threadId, comment)
    .then(thread => dispatch(receiveThread(thread)))
    .catch(err => console.log(err))
);

export const updateComment = (threadId, commentId, comment) => dispatch => (
  ThreadApiUtil.editComment(threadId, commentId, comment)
    .then(thread => dispatch(receiveThread(thread)))
    .catch(err => console.log(err))
);
