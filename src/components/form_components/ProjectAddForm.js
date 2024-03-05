import {Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from "yup";
import '../component_CSS/form.css';

function ProjectAddForm({addProject, close}){

    const formSchema = yup.object().shape({
        comment: yup.string().nullable(),
        name: yup.string().required("Must Enter Name For Assignment"),
        customer_name: yup.string().required("Must Enter Customer Name"),
        start_date: yup.date().required("Start Date is Required"),
        expected_end_date: yup.date().required("Expected End Date is Required")
            .min(yup.ref("start_date"), "Expected End Date Cannot Be Less Than Start Date"),
        sale_price: yup.number().required("Must Enter Detail")
            .test("maxDecimalPlaces", "Sales Price Must Have a Maxmum of 2 Decimal Places", value => {
                if(!value) return true;
                const decimalPlaces = (value.toString().split('.')[1] || '').length;
                return decimalPlaces <= 2
            }),
        sales_order: yup.number().required("Must Include Sales Order").integer("Value Must be an Integer")
    })

    const formik = useFormik({
        initialValues: {
            comment: "",
            name: "",
            customer_name: "",
            sale_price: "",
            start_date: "",
            expected_end_date: "",
            sales_order: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/projects', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((r) => {
                if(r.ok) return r.json();
                throw new Error("Something went wrong")
            })
            .then((newProject) => {
                addProject(newProject);
                close();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })


    return(
        <>
            <Form onSubmit={formik.handleSubmit}>
                <button className="btn-position" onClick={close}>X</button>
                <h2>Project Add Form</h2>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Project Name' placeholder='Project Name' 
                            name="name" value={formik.values.name} onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.name}</p>

                    <Form.Input fluid label='Sales Order' placeholder='Sales Order' name="sales_order" 
                            type='number' value={formik.values.sales_order} onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.sales_order}</p>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Customer Name' placeholder='Customer Name'
                            name='customer_name' value={formik.values.customer_name} onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.customer_name}</p>

                    <Form.Input fluid label='Sale Price'placeholder='Sale Price' name='sale_price'
                            value={formik.values.sale_price} type='number' onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.sale_price}</p>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Start Date' name='start_date' value={formik.values.start_date}
                            type='date' onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.start_date}</p>

                    <Form.Input fluid label='Expected End Date' name='expected_end_date' value={formik.values.expected_end_date}
                            type='date' onChange={formik.handleChange}/>
                    <p style={{color: 'red'}}>{formik.errors.expected_end_date}</p>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.TextArea fluid label="Comments" placeholder='comment' value={formik.values.comment}
                            name='comment' onChange={formik.handleChange}/>
                </Form.Group>
                <Button type="submit">SUBMIT</Button>
            </Form>
        </>
    )
}

export default ProjectAddForm;

