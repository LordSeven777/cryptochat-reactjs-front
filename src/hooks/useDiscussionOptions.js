import { useState } from "react";

const useDiscussionOption = (discussions, discussion) => {
  const [isOpen, setOpen] = useState(false);
  return { optionIsOpen: isOpen, setOptionOpen: setOpen };
};

export default useDiscussionOption;
