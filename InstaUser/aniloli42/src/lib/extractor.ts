export const userNameExtractor = (url: string): string => {
  if (!url) throw new Error(`Invalid URL Passed`);

  const pathSegments = url.split("/").filter(Boolean);

  if (!pathSegments.length) throw new Error(`Invalid URL.`);
  const instagramIndex = pathSegments.findIndex(
    (segment) => segment === "instagram.com"
  );

  if (instagramIndex === -1)
    throw new Error("Provided URL is not a Instagram URL");

  const username = pathSegments.at(instagramIndex + 1)?.split("?")[0];

  if (!username) throw new Error("Username not found.");

  return username;
};
