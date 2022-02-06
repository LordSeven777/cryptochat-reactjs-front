import { /* useEffect, */ useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

const useDiscussion = routerProps => {
  const {
    match: {
      params: { type, id }
    },
    location: { search }
  } = routerProps;
  const location = queryString.parse(search);
  const discussionID = parseInt(id);

  const { discussions, _discussions, others, dLoading } = useSelector(
    state => state.discussion
  );

  // Gets the discussions array specified by the location
  const temp = useCallback(
    location => {
      // Located discussions
      let ld;
      switch (location) {
        case "dis":
          ld = discussions;
          break;
        case "tmp":
          ld = _discussions;
          break;
        case "oth":
          ld = others;
          break;
        default:
          ld = discussions;
          break;
      }
      return ld;
    },
    [discussions, _discussions, others]
  );
  const targetDiscussions = useMemo(() => temp, [temp]);

  // The searched discussion
  const discussion = useMemo(() => {
    // A set for the 3 possible location value
    const locSet = new Set();
    locSet.add("dis");
    locSet.add("tmp");
    locSet.add("oth");

    // The target discussion
    let target = targetDiscussions(location);
    // Searched discussion
    let discussion = target
      ? target.find(d => d.type === type && d.discussionID === discussionID)
      : null;
    if (!discussion) {
      locSet.delete(location);
      for (const _location of locSet) {
        target = targetDiscussions(_location);
        if (!target) continue;
        discussion = target.find(
          d => d.type === type && d.discussionID === discussionID
        );
      }
    }
    return discussion;
  }, [discussionID, type, targetDiscussions, location]);
  // console.log(discussion);

  // Active status of the discussion
  const isActive = useMemo(() => {
    if (!discussion) return false;
    if (type === "peer") return Boolean(discussion.user.online);
    else return discussion.members.some(user => Boolean(user.online));
  }, [discussion, type]);

  return { discussion, loading: dLoading, isActive };
};

export default useDiscussion;
