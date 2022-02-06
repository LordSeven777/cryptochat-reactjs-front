import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUsers,
  faCaretDown,
  faUserCog,
  faUserClock,
  faUserSlash,
  faEyeSlash,
  faSignOutAlt,
  faSearch,
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faPencilAlt,
  faCheck,
  faCircle,
  faInfoCircle,
  faFileImage,
  faPaperPlane,
  faLock,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";

// Including the icons for global use
library.add(
  faUsers,
  faCaretDown,
  faUserCog,
  faUserClock,
  faUserSlash,
  faEyeSlash,
  faSignOutAlt,
  faSearch,
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faPencilAlt,
  faCheck,
  faCircle,
  faInfoCircle,
  faFileImage,
  faPaperPlane,
  faLock,
  faPenSquare
);

const FontAwesomeImports = ({ children }) => {
  return <>{children}</>;
};

export default FontAwesomeImports;
