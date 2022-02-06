import * as types from "./discussion-types";
import {
  fetchDiscussions,
  fetchDiscussionMessages
} from "../../apis/discussions-api";
import { fetchNoContactUsers } from "../../apis/users-api";

// Discussions' fetch is loading
const onDiscussionsFetchLoading = () => ({
  type: types.DISCUSSIONS_FETCH_LOADING
});

// Discussions' fetch is successful
const onDiscussionsFetchSuccess = (
  discussions,
  unreadNb,
  dataEnd,
  isInitial
) => ({
  type: types.DISCUSSIONS_FETCH_SUCCESS,
  payload: { discussions, unreadNb, dataEnd, isInitial }
});

// Fetching the discussions
const onDiscussionsFetch = page => dispatch => {
  const LIMIT = 5;
  dispatch(onDiscussionsFetchLoading());
  fetchDiscussions(page, LIMIT, "", page === 1)
    .then(({ discussions, unreadNb }) => {
      dispatch(
        onDiscussionsFetchSuccess(
          discussions,
          unreadNb,
          discussions.length < LIMIT,
          page === 1
        )
      );
    })
    .catch(error => console.log(error.message));
};

// Change of the discussions' page
const onDiscussionsPageChange = () => ({
  type: types.DISCUSSIONS_PAGE_CHANGE
});

// Successful fetch of the others
const onOthersFetchSuccess = (others, oDataEnd) => ({
  type: types.OTHERS_FETCH_SUCCESS,
  payload: { others, oDataEnd }
});

// Fetching the others
const onOthersFetch = page => dispatch => {
  const LIMIT = 5;
  dispatch(onDiscussionsFetchLoading());
  fetchNoContactUsers(page, LIMIT)
    .then(others => {
      // console.log(others);
      dispatch(onOthersFetchSuccess(others, others.length < LIMIT));
    })
    .catch(error => console.log(error));
};

// Change of the others' page
const onOthersPageChange = () => ({
  type: types.OTHERS_PAGE_CHANGE
});

// Change of the initialiased state
const onInitChange = (isInitial = true) => ({
  type: types.INIT_CHANGE,
  payload: { isInitial }
});

// When messages fetch is Loading
const onMessagesFetchLoading = (loadingState = true) => ({
  type: types.MESSAGES_FETCH_LOADING,
  payload: { loading: loadingState ? "more" : null }
});

// When messages are fetched successfully
const onMessagesFetchSuccess = (messages, mEnd, type, discussionID) => ({
  type: types.MESSAGES_FETCH_SUCCESS,
  payload: { messages, mEnd, discussionID, type }
});

// Process of message fetching
const onMessagesFetch = (type, discussionID, dateCheckup) => dispatch => {
  dispatch(onMessagesFetchLoading());
  fetchDiscussionMessages(type, discussionID, dateCheckup).then(
    ({ messages, mEnd, discussionID, type }) => {
      dispatch(onMessagesFetchSuccess(messages, mEnd, type, discussionID));
    }
  );
};

// On a new received message
const onNewMessage = (message, discussion) => ({
  type: types.NEW_MESSAGE,
  payload: { message, discussion }
});

export {
  onDiscussionsFetch,
  onDiscussionsPageChange,
  onOthersFetch,
  onOthersPageChange,
  onInitChange,
  onMessagesFetchLoading,
  onMessagesFetchSuccess,
  onMessagesFetch,
  onNewMessage
};
