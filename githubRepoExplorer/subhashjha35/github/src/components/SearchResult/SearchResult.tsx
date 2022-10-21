import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import GithubServices from "../../services/GithubServices";

import Repository from "../../types/Repositories";
import './SearchResult.scss';

const SearchResult: React.FC = () => {
  let { name } = useParams<{ name: string }>();
  const { data } = useQuery(["repo", name], ({ queryKey }) =>
    GithubServices.searchRepos(queryKey[1])
  );

  return (
    <>
      <div className="row search-result">
        {!!data &&
          data?.items.map((value: Repository) => (
            <div key={value.id} className="col-lg-3 col-md-2 p-10">
              <div className="card center">
                <Link
                  to={{ pathname: `/repo/${value.id}/${btoa(value.url)}` }}
                  className="repo-item"
                >
                  <div className="owner-avatar">
                    <img src={value.owner.avatar_url} alt={value.owner.login} />
                  </div>
                  <div className="repo-title">{value.name}</div>
                </Link>
              </div>
            </div>
          ))}
      </div>
      {/* <pre>{JSON.stringify(data?.items, null, 2)}</pre> */}
    </>
  );
};

export default SearchResult;
