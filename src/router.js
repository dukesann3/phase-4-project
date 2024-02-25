import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Employees from "./components/employee_components/Employees";
import Home from "./components/Home";
import Projects from "./components/project_components/Projects";
import ProjectDetail from "./components/project_components/ProjectDetail";
import EmployeeID from "./components/employee_components/EmployeeID";
import AddAssignment from "./components/AddAssignment";
import AllAssignmentLog from "./components/AllAssignmentLog";
import AllProjectLog from "./components/AllProjectLog";
import Test from "./components/Test";

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
                path: '/employees/:emp_id',
                element: <EmployeeID />
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: "/projects/:prj_id",
                element: <ProjectDetail />
            },
            {
                path: "/add_assignments",
                element: <AddAssignment />
            },
            {
                path: '/assignment_logs',
                element: <AllAssignmentLog />
            },
            {
                path: '/project_logs',
                element: <AllProjectLog />
            },
            {
                path: '/test',
                element: <Test />
            }
        ]
    }
])

export default router