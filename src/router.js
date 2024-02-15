import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Employees from "./components/Employees";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/employees',
                element: <Employees />
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: "/projects/:prj_id",
                element: <ProjectDetail />
            }
        ]
    }
])

export default router