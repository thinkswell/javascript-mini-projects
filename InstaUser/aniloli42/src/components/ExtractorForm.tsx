import ShowResult from "@/components/ShowResult";
import { useExtractor } from "@/hooks/useExtractor";

const ExtractorForm = () => {
  const { extract, result, error } = useExtractor();

  return (
    <>
      <form
        className="bg-gray-400 p-6 rounded-lg lg:w-[40rem]"
        onSubmit={extract}
      >
        <input
          type="text"
          name="instagram-url"
          inputMode="url"
          className="bg-gray-300 px-4 py-2 w-full rounded outline-none focus-visible:ring focus-visible:ring-gray-600 text-gray-600 text-xl"
          placeholder="Paste Here: https://instagram.com/demo"
        />

        <button
          type="submit"
          className="mt-4 bg-gray-600  px-4 py-2 w-full rounded text-gray-300  font-semibold uppercase hover:bg-gray-700 focus-visible:bg-gray-700 focus-visible:ring-gray-300 focus-visible:ring outline-none"
        >
          Get UserName
        </button>
      </form>

      <ShowResult result={result} error={error} />
    </>
  );
};

export default ExtractorForm;
