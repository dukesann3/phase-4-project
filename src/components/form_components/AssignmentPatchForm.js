import {Form, Button} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { EmployeeSelectionForPatch, ProjectSelectionForPatch } from './DataSelection';
import '../component_CSS/form.css';

function AssignmentPatchForm({close, patchAssignment, assignment}){


    const [emps, setEmps] = useState([]);
    const [prjs, setPrjs] = useState([]);
    const [submitError, setSubmitError] = useState(false);

    const closeOut = () => {
        setSubmitError(false);
        close();
    }

    useEffect(() => {
        Promise.all([
            fetch('/employees'),
            fetch('/projects')
        ])
        .then(resp => Promise.all(resp.map((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong.");
        })))
        .then(([emp, prj]) => {
            setEmps(emp);
            setPrjs(prj);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    const {employee_id, project_id, name, comments, start_date, expected_end_date, id} = assignment;

    const formSchema = yup.object().shape({
        employee_id: yup.number().positive().integer()
            .required("Must Enter Employee ID").typeError("Please Enter an Integer"),
        project_id: yup.number().positive().integer()
            .required("Must Enter Project ID").typeError("Please Enter an Integer"),
        name: yup.string().required("Must Enter Name For Assignment"),
        comments: yup.string().nullable(),
        start_date: yup.date().required("Start Date is Required"),
        expected_end_date: yup.date().required("Expected End Date is Required")
            .min(yup.ref("start_date"), "Expected End Date Cannot Be Less Than Start Date"),
        detail: yup.string().required("Must Enter Detail")
    })

    const formik = useFormik({
        initialValues: {
            employee_id: employee_id,
            project_id: project_id,
            name: name,
            comments: comments,
            start_date: start_date,
            expected_end_date: expected_end_date,
            detail: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/assignments/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((r) => {
                if(r.ok){
                    return r.json();
                }
                console.log(r);
                throw new Error("Something went wrong")
            })
            .then((newAssignment) => {
                patchAssignment(newAssignment);
                close();
            })
            .catch((error) => {
                setSubmitError(true);
                console.log(error);
            })
        }
    })

    return(
        <Form className="form" onSubmit={formik.handleSubmit}>
            <button className="btn-position" onClick={closeOut}>X</button>
            <h2>Edit Assignment</h2>
            <Form.Group widths='equal'>
                <EmployeeSelectionForPatch emps={emps} OGempID={employee_id}
                    handleChange={formik.handleChange} value={formik.values.employee_id}/>
                <p style={{color: 'red'}}>{formik.errors.employee_id}</p>

                <ProjectSelectionForPatch prjs={prjs} OGprjID={project_id}
                    handleChange={formik.handleChange} value={formik.values.project_id}/>
                <p style={{color: 'red'}}>{formik.errors.project_id}</p>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Assignment Name" placeholder="Assignment Name" name="name"
                        value={formik.values.name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.name}</p>

                <Form.TextArea label="Comments" placeholder="Comments" name="comments"
                        value={formik.values.comments} onChange={formik.handleChange}/>

                <Form.TextArea label="Change Detail" placeholder="Change Detail" name="detail"
                        value={formik.values.detail} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.detail}</p>
            </Form.Group>
            <Form.Group widths='equal'>
                <input type="date" placeholder="Start Date" name="start_date" 
                        value={formik.values.start_date} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.start_date}</p>

                <input type="date" placeholder="Expected End Date" name="expected_end_date"
                        value={formik.values.expected_end_date} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.expected_end_date}</p>
            </Form.Group>

            {submitError ? 
            <>
                <p style={{color: 'red'}}>Cannot submit form since assignment start/end date is not within the project timeline</p>
            </>
            :
            null}

            <Button type='submit'>SUBMIT</Button>
        </Form>
    )
}

export default AssignmentPatchForm;

