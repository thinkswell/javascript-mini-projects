
export default async function getProjectNameAndSave() {
  const repo_url="https://api.github.com/repos/thinkswell/javascript-mini-projects/contents"
  let repo_content = await fetch(repo_url).then((res) => res.json());
  
  //processing data to only include projectName, excluding other files and folders
  let data = repo_content.filter((item) => (item.path != "1Application-frontend" ? true : false));
  data = data.filter((item) => (item.type == "dir"? true : false));
  data = data.filter((item) => ((item.path).match(/[. \/]/g) == null? true : false));
  data = data.map((item) => item.name);
  return data;
}
