import {employees, projects, assignments} from "./data";
import {http, HttpResponse} from "msw";

let emp = employees;
let prj = projects;
let asgn = assignments;

export const handlers = [
    http.get('/employees', () => {
        return HttpResponse.json(emp.filter(attr => (attr !== "assignments" || attr !== "projects")));     
    }),
    http.get('/projects', () => {
        return HttpResponse.json(prj.filter(attr => (attr !== "assignments" || attr !== "employees")));
    }),
    http.get('/assignments', () => {
        return HttpResponse.json(asgn.filter(attr => (attr !== "project" || attr !== "employee")));
    })
];

// api.add_resource(Employees, '/employees')
// api.add_resource(EmployeeID, '/employees/<int:id>')
// api.add_resource(Projects, '/projects')
// api.add_resource(ProjectID, '/projects/<int:id>')
// api.add_resource(AssignmentInProject, '/projects/assignments/<int:prj_id>')
// api.add_resource(Assignments, '/assignments')
// api.add_resource(AssignmentID, '/assignments/<int:id>')
// api.add_resource(ProjectChangeLogs, '/project_log')
// api.add_resource(AssignmentChangeLogs, '/assignment_log')


