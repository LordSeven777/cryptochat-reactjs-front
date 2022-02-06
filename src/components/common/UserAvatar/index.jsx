import React, { useState, useMemo, lazy, Suspense } from "react";
import getUsername from "../../../helpers/username";
import defaultManAvatar from "../../../assets/images/default-man.png";
import defaultWomanAvatar from "../../../assets/images/default-woman.png";
import incognitoAvatar from "../../../assets/images/incognito-avatar.png";
// import janeDoe from "../../../assets/images/team1.jpg";
import "./style.scss";

const PhotoModal = lazy(() => import("../PhotoModal"));

// Returns the default avatar photo for a user
const getDefaultAvatarPhoto = (gender, hidden) => {
  return hidden ? incognitoAvatar : gender === "M" ? defaultManAvatar : defaultWomanAvatar;
};

const UserAvatar = ({ type, user, group, members, displayable, className, isStatic }) => {
  const [modalShow, setModalShow] = useState(false);

  // FIX
  if (!group) group = { name: "" };
  if (!user) user = { gender: null, photoURL: null, hidden: null, online: null };

  const { gender, photoURL, hidden, online } = user;

  // Active status
  const isActive = useMemo(() => {
    return type === "peer" ? online : members.some((user) => user.online);
  }, [type, online, members]);

  // The container's className
  let containerClassName = "avatar-container";
  if (className) containerClassName += ` ${className}`;
  if (!photoURL && type === "peer") containerClassName += " default";

  // Image caption
  const imageCaption = useMemo(() => {
    return type === "peer" ? `${getUsername(user)}'s profile photo` : `${group.name}'s group photo`;
  }, [user, type, group.name]);

  // Whether we can display the photo modal or not
  const canDisplayPhotoModal = displayable && photoURL !== null;

  // Container's backiground image
  const containerBackground = useMemo(() => {
    if (photoURL || type === "group") return "none";
    else {
      return `url("${
        hidden ? incognitoAvatar : gender === "M" ? defaultManAvatar : defaultWomanAvatar
      }")`;
    }
  }, [photoURL, hidden, type, gender]);

  // Group users for avatars preview
  const gUsersPreview = useMemo(() => {
    const avatars = [];
    if (type === "group") {
      const currentUser = { userID: 1 };
      for (let i = 0; i < 3; i++) {
        if (parseInt(members[i].userID) !== parseInt(currentUser.userID)) avatars.push(members[i]);
        if (avatars.length === 2) break;
      }
    }
    return avatars;
  }, [members, type]);

  return (
    <div className="user-avatar">
      {canDisplayPhotoModal && modalShow && (
        <Suspense
          fallback={
            <div className="photo-modal-suspense d-flex justify-content-center align-items-center">
              <span>Loading ...</span>
            </div>
          }
        >
          <PhotoModal
            show={modalShow}
            imageURL={photoURL}
            caption={imageCaption}
            onClose={() => setModalShow(false)}
          />
        </Suspense>
      )}
      <div className={containerClassName} style={{ backgroundImage: containerBackground }}>
        {canDisplayPhotoModal && <div className="overlay" onClick={() => setModalShow(true)}></div>}
        {((type === "peer" && photoURL) || (type === "group" && group.photoURL)) && (
          <img
            src={type === "peer" ? photoURL : group.photoURL}
            alt={imageCaption}
            className="discussion-photo"
          />
        )}
        {type === "group" && !group.photoURL && (
          <>
            {gUsersPreview.map((user, i) => (
              <img
                key={user.userID}
                src={
                  user.photoURL ? user.photoURL : getDefaultAvatarPhoto(user.gender, user.hidden)
                }
                alt={getUsername(user)}
                className={`member-photo photo-${i}`}
              />
            ))}
          </>
        )}
      </div>
      {!isStatic && isActive && <div className="active-dot"></div>}
    </div>
  );
};

UserAvatar.defaultProps = {
  type: "peer",
  // user: {
  //   fullName: "Jane Doe",
  //   gender: "F",
  //   photoURL: null,
  //   hidden: false,
  //   online: true,
  // },
  // group: {
  //   groupID: 1,
  //   name: "My group",
  //   photoURL: null,
  // },
  // members: [
  //   {
  //     userID: "0000000001",
  //     fullName: "John Doe",
  //     online: 1,
  //     hidden: 0,
  //     gender: "M",
  //     photoURL: "http://localhost:5000/users/photos/1.jpg",
  //     lastReadMessageID: "0000000001",
  //     status: "member",
  //   },
  //   {
  //     userID: "0000000002",
  //     fullName: "Derrick Pike",
  //     online: 1,
  //     hidden: 0,
  //     gender: "M",
  //     photoURL: "http://localhost:5000/users/photos/2.jpg",
  //     lastReadMessageID: "0000000001",
  //     status: "member",
  //   },
  //   {
  //     userID: "0000000003",
  //     fullName: "Amber Lee",
  //     online: 1,
  //     hidden: 1,
  //     pseudo: "mbrLee98",
  //     lastReadMessageID: "0000000001",
  //     status: "member",
  //   },
  // ],
  displayable: false,
  isStatic: false,
};

export default React.memo(UserAvatar);
