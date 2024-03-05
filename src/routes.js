import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Employees from "./components/employee_components/Employees";
import Home from "./components/Home";
import Projects from "./components/project_components/Projects";
import ProjectDetail from "./components/project_components/ProjectDetail";
import EmployeeDetail from "./components/employee_components/EmployeeDetail";
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
                path: '/employee',
                element: <Employees />
            },
            {
                path: '/employee/:emp_id',
                element: <EmployeeDetail />
            },
            {
                path: '/project',
                element: <Projects />,
            },
            {
                path: "/project/:prj_id",
                element: <ProjectDetail />
            },
            {
                path: '/test',
                element: <Test />
            }
        ]
    }
]

export default routes