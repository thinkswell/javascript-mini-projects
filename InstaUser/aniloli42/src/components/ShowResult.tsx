import CopyToClipboardButton from "@/components/CopyToClipboardButton";

type ShowResultProps = { result: string; error: string };

const ShowResult = ({ result, error }: ShowResultProps) => {
  return (
    <div className="mt-5 w-full bg-gray-800 rounded-md py-2 h-14 flex items-center justify-between px-4">
      {!error && !result && (
        <span className="text-gray-200 text-lg">
          Paste Instagram URL in Input Box.
        </span>
      )}

      {!!error && <span className="text-red-400 text-lg">{error}</span>}

      {!!result && (
        <>
          <span className="text-gray-200 text-lg">@{result}</span>
          <CopyToClipboardButton toCopy={result} />
        </>
      )}
    </div>
  );
};

export default ShowResult;
