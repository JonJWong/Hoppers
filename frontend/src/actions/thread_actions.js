import * as ThreadApiUtil from "../util/thread_api_util";

export const RECEIVE_THREAD = "RECEIVE_THREAD";
export const RECEIVE_NEW_THREAD = "RECEIVE_NEW_THREAD"
export const REMOVE_THREAD = "REMOVE_THREAD"

export const receiveThread = (thread) => ({
  type: RECEIVE_THREAD,
  thread
});

const receiveNewThread = (thread) => ({
  type: RECEIVE_NEW_THREAD,
  thread
})

const removeThread = (threadId) => ({
  type: REMOVE_THREAD, 
  threadId
})

export const createThread = (thread) => dispatch => {
  ThreadApiUtil.makeThread(thread)
  .then(thread => dispatch(receiveNewThread(thread)))
  .catch(err => console.log(err))
}

export const deleteThread = (threadId) => disaptch => {
  ThreadApiUtil.deleteThread(threadId)
  .then(() => disaptch(removeThread(threadId)))
  .catch(err => console.log(err))
}

export const updateThread = (thread) => dispatch => {
  ThreadApiUtil.editThread(thread)
  .then((thread) => dispatch(receiveThread(thread)))
  .catch(err => console.log(err))
}

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

export const removeComment = (threadId, commentId) => dispatch => (
  ThreadApiUtil.deleteComment(threadId, commentId)
    .then(thread => dispatch(receiveThread(thread)))
    .catch(err => console.log(err))
);
