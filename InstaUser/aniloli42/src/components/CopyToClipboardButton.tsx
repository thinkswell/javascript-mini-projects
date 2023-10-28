import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";

type CopyToClipboardButtonProps = {
  toCopy: string;
};

const CopyToClipboardButton = ({ toCopy }: CopyToClipboardButtonProps) => {
  const [isClicked, SetIsClicked] = useState(false);

  const copyToClipboard = async (copyContent: string) => {
    await navigator.clipboard.writeText(copyContent);
  };

  return (
    <button
      type="button"
      className="bg-gray-400 p-2 rounded text-sm  group hover:bg-gray-600 hover:text-gray-200 focus-visible:bg-gray-600 visited:bg-transparent active:bg-transparent outline-none"
      onClick={() => {
        SetIsClicked(true);
        copyToClipboard(toCopy);
        setTimeout(() => SetIsClicked(false), 500);
      }}
    >
      {isClicked ? (
        <BsCheckAll className="text-base text-gray-600 group-hover:text-gray-200 group-focus-visible:text-gray-200" />
      ) : (
        <MdContentCopy className="text-base text-gray-600 group-hover:text-gray-200 group-focus-visible:text-gray-200" />
      )}
    </button>
  );
};

export default CopyToClipboardButton;
