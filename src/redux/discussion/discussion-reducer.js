import * as types from "./discussion-types";

const initialState = {
  isInitial: true,
  unreadNb: 0,
  loading: true,
  discussions: null,
  dPage: 1,
  dDataEnd: false,
  _discussions: [],
  others: null,
  oPage: 0,
  oDataEnd: false,
  search: "",
  dLoading: "more"
};

const reducer = (state = initialState, action) => {
  const discussionsSelector = location => {
    switch (location) {
      case "dis":
        return state.discussions;
      case "tmp":
        return state._discussions;
      case "oth":
        return state.others;
      default:
        return state.discussions;
    }
  };

  switch (action.type) {
    // Loading the discussions
    case types.DISCUSSIONS_FETCH_LOADING:
      return { ...state, loading: true };

    // Discussions successfully fetched
    case types.DISCUSSIONS_FETCH_SUCCESS:
      const { discussions, unreadNb, dataEnd, isInitial } = action.payload;
      const _discussions = state.discussions === null ? [] : state.discussions;
      return {
        ...state,
        dDataEnd: dataEnd,
        isInitial,
        loading: false,
        unreadNb: unreadNb ? unreadNb : state.unreadNb,
        discussions: [..._discussions, ...discussions]
      };

    // Gets the next discussions data page
    case types.DISCUSSIONS_PAGE_CHANGE:
      return { ...state, dPage: state.dPage + 1 };

    // The no-contact users successfully fetched
    case types.OTHERS_FETCH_SUCCESS:
      const { others, oDataEnd } = action.payload;
      const _others = state.others === null ? [] : state.others;
      return {
        ...state,
        oDataEnd,
        loading: false,
        others: [
          ..._others,
          ...others.map((user, i) => ({
            type: "peer",
            discussionID: parseInt(Math.random() * 100 + "" + user.userID),
            user,
            messages: []
          }))
        ]
      };

    // Change of the others' discussions' page
    case types.OTHERS_PAGE_CHANGE:
      return { ...state, oPage: state.oPage + 1 };

    // Change of the initialisation value
    case types.INIT_CHANGE:
      return { ...state, isInitial: action.payload.isInitial };

    // When messages fetch is Loading
    case types.MESSAGES_FETCH_LOADING:
      return { ...state, dLoading: "more" };

    // When messages are fetched successfully
    case types.MESSAGES_FETCH_SUCCESS:
      const {
        type: newMsgType,
        discussionID: newMsgDiscussionID,
        mEnd,
        messages: newMessages
      } = action.payload;
      let locatedDiscussion, locatedDiscussionIndex;
      let searchedDiscussions;
      const discussionFinder = (d, i) => {
        if (d.type === newMsgType && d.discussionID === newMsgDiscussionID) {
          locatedDiscussionIndex = i;
          return true;
        } else return false;
      };
      const discussionsLocations = ["dis", "tmp"];
      let disLocation = null;
      for (let i = 0; i < 2; i++) {
        searchedDiscussions = discussionsSelector(discussionsLocations[i]);
        locatedDiscussion = searchedDiscussions.find(discussionFinder);
        if (locatedDiscussion) {
          disLocation = discussionsLocations[i];
          break;
        }
      }
      const newMsgDiscussions = [...searchedDiscussions];
      newMsgDiscussions[locatedDiscussionIndex] = {
        ...locatedDiscussion,
        mEnd,
        messages: [...locatedDiscussion.messages, ...newMessages]
      };
      return {
        ...state,
        dLoading: null,
        [disLocation === "dis"
          ? "discussions"
          : "_discussions"]: newMsgDiscussions
      };

    // On a new received message
    case types.NEW_MESSAGE:
      const { message: newMessage, discussion: newDiscussion } = action.payload;
      let locatedDiscussion1 = null,
        locatedDiscussions1 = null,
        dIndex = 0,
        __discussions,
        discussionsCopy1;
      const discussionFinder1 = (d, i) => {
        const isFound =
          d.type === newDiscussion.type &&
          d.discussionID === parseInt(newDiscussion.discussionID);
        if (isFound) dIndex = i;
        return isFound;
      };
      const locations1 = ["dis", "_dis"];
      for (const l of locations1) {
        const _discussions = discussionsSelector(l);
        locatedDiscussion1 = _discussions.find(discussionFinder1);
        if (locatedDiscussion1) {
          locatedDiscussions1 = _discussions;
          break;
        }
      }
      __discussions =
        locatedDiscussions1 === state._discussions
          ? [...state._discussions].splice(dIndex, 1)
          : state._discussions;
      discussionsCopy1 = [...state.discussions];
      if (!locatedDiscussion1) {
        discussionsCopy1.unshift({
          ...newDiscussion,
          messages: [newMessage]
        });
      } else {
        const discussionCopy = { ...locatedDiscussion1 };
        discussionCopy.messages = [newMessage, ...discussionCopy.messages];
        discussionsCopy1.splice(dIndex, 1);
        discussionsCopy1.unshift(discussionCopy);
      }
      discussionsCopy1.sort((d1, d2) => {
        const date1 = d1.messages[0]
          ? d1.messages[0].date
          : d1.type === "peer"
          ? d1.status.date
          : d1.members[d1.members.length - 1].statusDate;
        const date2 = d2.messages[0]
          ? d2.messages[0].date
          : d2.type === "peer"
          ? d2.status.date
          : d2.members[d2.members.length - 1].statusDate;
        return date2 < date1 ? -1 : 1;
      });
      return {
        ...state,
        _discussions: __discussions,
        discussions: discussionsCopy1
      };

    default:
      return state;
  }
};

export default reducer;
