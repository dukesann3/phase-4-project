import { Form, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { EmployeeSelectionForAdd, ProjectSelectionForAdd } from "./DataSelection";
import '../component_CSS/form.css';


function AssignmentAddForm({addAssignment, close, id}){

    const [emps, setEmps] = useState([]);
    const [prjs, setPrjs] = useState([]);
    const [initialEmp, setInitialEmp] = useState();
    const [initialPrj, setInitialPrj] = useState();

    useEffect(() => {
        Promise.all([
            fetch('/employees'),
            fetch('/projects')
        ])
        .then(response => Promise.all(response.map((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong");
        })))
        .then(([empResp, prjResp]) => {
            setEmps(empResp);
            setPrjs(prjResp);
            if(url.includes("employee")){
                formik.values.project_id = prjResp[0].id;
            }
            else{
                formik.values.employee_id = empResp[0].id;
            }
        })
    },[]);

    const url = window.location.href;

    const employee_id = url.includes("employee") ? id : "";
    const project_id = url.includes("project") ? id : "";

    const formSchema = yup.object().shape({
        employee_id: url.includes("project") ? yup.number().positive().integer()
        .required("Must Enter Employee ID").typeError("Please Enter an Integer") 
        : yup.number(),
        project_id: url.includes("employee") ? yup.number().positive().integer()
        .required("Must Enter Project ID").typeError("Please Enter an Integer")
        : yup.number(),
        name: yup.string().required("Must Enter Name For Assignment"),
        comments: yup.string().nullable(),
        start_date: yup.date().required("Start Date is Required"),
        expected_end_date: yup.date().required("Expected End Date is Required")
            .min(yup.ref("start_date"), "Expected End Date Cannot Be Less Than Start Date"),
    })

    const formik = useFormik({
        initialValues: {
            employee_id: employee_id,
            project_id: project_id,
            name: "",
            comments: "",
            start_date: "",
            expected_end_date: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/assignments", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then((r) => {
                if(r.ok){
                    console.log(r);
                    return r.json();
                }
                throw new Error("Something went wrong")
            })
            .then((newAssignment) => {
                addAssignment(newAssignment);
                close();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })


    return (
        <Form onSubmit={formik.handleSubmit}>
            <button className='btn-position' onClick={close}>X</button>
            <h2>Add Assignment</h2>
            <Form.Group widths='equal' className="align">

                {url.includes("project") ? 
                <>
                    <EmployeeSelectionForAdd emps={emps} handleChange={formik.handleChange} value={formik.values.employee_id}/>
                    <p style={{color: 'red'}}>{formik.errors.employee_id}</p>
                </>
                : 
                null}
                {url.includes("employee") ? 
                <>
                    <ProjectSelectionForAdd prjs={prjs} handleChange={formik.handleChange} value={formik.values.project_id}/>
                    <p style={{color: 'red'}}>{formik.errors.project_id}</p>
                </>
                : 
                null}

                <Form.Input fluid label="Assignment Name" placeholder='Assignment Name'
                        name="name" value={formik.values.name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.name}</p>

            </Form.Group>
            <Form.Group widths='equal'>

                <Form.Input fluid label="Start Date" name="start_date"
                        value={formik.values.start_date} onChange={formik.handleChange} type='date'/>
                <p style={{color: 'red'}}>{formik.errors.start_date}</p>

                <Form.Input fluid label="Expected End Date" name="expected_end_date"
                        value={formik.values.expected_end_date} onChange={formik.handleChange} type='date'/>
                <p style={{color: 'red'}}>{formik.errors.expected_end_date}</p>

                <Form.TextArea fluid label="Comment" name="comments"
                        value={formik.values.comments} onChange={formik.handleChange}/>

            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default AssignmentAddForm;
