import { Route, Switch } from "react-router-dom";
import SearchResult from "./components/SearchResult/SearchResult";
import RepoDetails from "./components/RepoDetails/RepoDetails";
import Home from "./components/Home/Home";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:name" component={SearchResult} />
      <Route path="/repo/:id/:url" component={RepoDetails} />
    </Switch>
  );
};

export default Routes;
