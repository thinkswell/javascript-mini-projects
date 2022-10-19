import Repository from '../types/Repositories';
import Issue from './../types/issues';

const searchRepos = async (name: string): Promise<{ items: Repository[] }> => {
  const res = await fetch(
    `https://api.github.com/search/repositories?per_page=10&page=1&q=${name}`
  );
  return res.json();
};

const getRepo = async (url: string): Promise<Repository> => {
  url = atob(url);
  const res = await fetch(url);
  return res.json();
};

const getIssues = async (url: string | undefined): Promise<Issue[] | []> => {
  if (!!url) {
      const res = await fetch(`${url}/issues`);
      return res.json();
  } else {
      return new Promise((reject, resolve) => [])
  }
};

const GithubService = {
  searchRepos,
  getRepo,
  getIssues
};

export default GithubService;
