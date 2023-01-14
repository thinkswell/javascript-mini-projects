import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import { useAppDispatch } from "./store/app/hooks";
import { getProgramListEffect } from "./store/program-list/program-list.effects";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProgramListEffect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App container">
      <Header />
      <div className="mt-3 mt-lg-4">
        <div className="m-auto app-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
