import { userNameExtractor } from "@/lib/extractor";
import { FormEvent, useState } from "react";

export const useExtractor = () => {
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const extract = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult("");

    try {
      const formData = new FormData(event.currentTarget);
      const url = formData.get("instagram-url")?.toString();

      if (!url) throw new Error(`URL is empty`);

      const extractedUserName = userNameExtractor(url);
      setResult(extractedUserName);

      event.currentTarget.reset();
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError(error.message);
      setResult("");
    }
  };

  return { error, extract, result };
};
