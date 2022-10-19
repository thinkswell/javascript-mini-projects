import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import GithubServices from "../../services/GithubServices";
import "./RepoDetails.scss";
import Issue from "../../types/issues";
const RepoDetails: React.FC = () => {
  const { url } = useParams<{ url: string; id: string }>();
  const repoDetails = useQuery(["repoDetail", url], ({ queryKey }) =>
    GithubServices.getRepo(queryKey[1])
  );

  const issues = useQuery(["issues", repoDetails?.data?.url], ({ queryKey }) =>
    GithubServices.getIssues(queryKey[1])
  );

  const [issueType, setIssueState] = useState("");

  const filteredIssue: Issue[] =
    issues?.data?.filter(issue => !issueType || issueType === issue?.state) ||
    [];

  if (!!repoDetails.data) {
    return (
      <>
        <div className="row repo">
          <div className="col-lg-3 col-md-2 p-10">
            <div className="card center">
              <div className="owner-avatar">
                <img
                  src={repoDetails?.data?.owner.avatar_url}
                  alt={repoDetails?.data?.owner.login}
                />
              </div>
              <div className="repo-title">
                <div className="strong">{repoDetails?.data?.name}</div>
                <div>{repoDetails?.data?.description}</div>
                <div>
                  <a href={repoDetails?.data?.html_url}>
                    {repoDetails?.data?.html_url}
                  </a>
                </div>
                <div>Forks: {repoDetails.data.forks}</div>
                <div>Total Issues: {repoDetails.data.open_issues}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2 p-10 issue-list">
            <h2>Issues</h2>
            <div>
              <button
                className="btn btn-warning m-10"
                onClick={() => setIssueState("open")}
              >
                Open
              </button>
              <button
                className="btn btn-primary m-10"
                onClick={() => setIssueState("closed")}
              >
                Closed
              </button>
            </div>
            {filteredIssue?.map(issue => (
              <a
                key={issue?.id}
                href={issue.html_url}
                className={issue.state === "open" ? "open" : "closed"}
              >
                {issue.number} : {issue.title}
              </a>
            ))}
            {filteredIssue.length === 0 ? (
              <div className="alert">No {issueType} issues found</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* <pre>{JSON.stringify(filteredIssue, null, 2)}</pre> */}
      </>
    );
  } else return <></>;
};

export default RepoDetails;
