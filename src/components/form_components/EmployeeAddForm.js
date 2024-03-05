import {Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from "yup";
import '../component_CSS/form.css';

function EmployeeAddForm({addEmployee, close}){

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Must Have First Name").typeError("Name Must be a String"),
        last_name: yup.string().required("Must Have Last Name").typeError("Name Must be a String"),
        department: yup.string().required("Must Have Department").typeError("Department Must be a String"),
        role: yup.string().required("Must Have Role").typeError("Role Must be a String")
    })

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            department: "",
            role: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/employees", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((r) => {
                if(r.ok){
                    return r.json();
                }
                throw new Error("Something went wrong");
            })
            .then((newEmployee) => {
                addEmployee(newEmployee);
                close();
            })
            .catch(error => console.log(error))
        }
    })

    return(
        <Form onSubmit={formik.handleSubmit}>
            <button className="btn-position" onClick={close}>X</button>
            <h2>Employee Add Form</h2>
            <Form.Group widths='equal'>
                <Form.Input fluid label='First Name' placeholder='First Name' name="first_name" 
                        value={formik.values.first_name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.first_name}</p>

                <Form.Input fluid label='Last Name' placeholder='Last Name' name="last_name" 
                        value={formik.values.last_name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.last_name}</p>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Department' placeholder='Department' name="department" 
                        value={formik.values.department} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.department}</p>
                
                <Form.Input fluid label='Role' placeholder='Role' name="role" 
                        value={formik.values.role} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.role}</p>
            </Form.Group>
            <Button type="submit">SUBMIT</Button>
        </Form>
    )
}

export default EmployeeAddForm;



