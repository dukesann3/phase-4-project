import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Employees from "./components/employee_components/Employees";
import Home from "./components/Home";
import Projects from "./components/project_components/Projects";
import ProjectDetail from "./components/project_components/ProjectDetail";
import EmployeeDetail from "./components/employee_components/EmployeeDetail";
import AddAssignment from "./components/AddAssignment";
import Test from "./components/Test";

const routes = [
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
                element: <EmployeeDetail />
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
                path: '/test',
                element: <Test />
            }
        ]
    }
]

export default routes