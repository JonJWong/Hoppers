import * as ThreadApiUtil from "../util/thread_api_util";

export const RECEIVE_THREAD = "RECEIVE_THREAD";
export const RECEIVE_NEW_THREAD = "RECEIVE_NEW_THREAD";
export const REMOVE_THREAD = "REMOVE_THREAD";
export const RECEIVE_THREAD_ERRORS = "RECEIVE_THREAD_ERRORS";
export const REMOVE_THREAD_ERRORS = "REMOVE_THREAD_ERRORS";

export const receiveThread = (thread) => ({
  type: RECEIVE_THREAD,
  thread
});

const receiveNewThread = (thread) => ({
  type: RECEIVE_NEW_THREAD,
  thread
});

const removeThread = (threadId) => ({
  type: REMOVE_THREAD, 
  threadId
});

const receiveThreadErrors = (errors) => ({
  type: RECEIVE_THREAD_ERRORS,
  errors
});

export const removeThreadErrors = () => ({
  type: REMOVE_THREAD_ERRORS
});

export const createThread = (thread) => dispatch => {
  ThreadApiUtil.makeThread(thread)
    .then(thread => dispatch(receiveNewThread(thread)))
    .catch(err => dispatch(receiveThreadErrors(err.response.data)))
}

export const deleteThread = (threadId) => disaptch => {
  ThreadApiUtil.deleteThread(threadId)
    .then(() => disaptch(removeThread(threadId)))
}

export const updateThread = (thread) => dispatch => {
  ThreadApiUtil.editThread(thread)
    .then((thread) => dispatch(receiveThread(thread)))
    .catch(err => dispatch(receiveThreadErrors(err.response.data)))
}

export const createComment = (threadId, comment) => dispatch => (
  ThreadApiUtil.makeComment(threadId, comment)
    .then(thread => dispatch(receiveThread(thread)))
);

export const updateComment = (threadId, commentId, comment) => dispatch => (
  ThreadApiUtil.editComment(threadId, commentId, comment)
    .then(thread => dispatch(receiveThread(thread)))
);

export const removeComment = (threadId, commentId) => dispatch => (
  ThreadApiUtil.deleteComment(threadId, commentId)
    .then(thread => dispatch(receiveThread(thread)))
);
