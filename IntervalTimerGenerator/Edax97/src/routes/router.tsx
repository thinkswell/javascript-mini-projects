import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AboutPage } from "../components/about-page/AboutPage";
import ErrorPage from "../components/error-page/ErrorPage";
import { EditProgramPage } from "../components/program-editor/edit-program-page/EditProgramPage";
import { NewProgramPage } from "../components/program-editor/new-program-page/NewProgramPage";
import { ProgramListPage } from "../components/program-list/program-list-page/ProgramListPage";
import { ProgramPlayPage } from "../components/program-play/program-play-page/ProgramPlayPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProgramListPage />,
      },
      {
        path: "programs",
        element: <ProgramListPage />,
      },
      {
        path: "new-program",
        element: <NewProgramPage />,
      },
      {
        path: "edit-program/:setId/:programId",
        element: <EditProgramPage />,
      },
      {
        path: "play-program/:setId/:programId",
        element: <ProgramPlayPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);
