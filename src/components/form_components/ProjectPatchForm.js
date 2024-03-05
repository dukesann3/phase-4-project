import {Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from "yup";
import '../component_CSS/form.css';

function ProjectPatchForm({patchProject, close, project}){

    const {name, comment, customer_name, sale_price, start_date, expected_end_date, sales_order, id} = project;

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
        sales_order: yup.number().required("Must Include Sales Order").integer("Value Must be an Integer"),
        detail: yup.string().required("Must Enter Change Detail")
    })

    const formik = useFormik({
        initialValues: {
            comment: comment,
            name: name,
            customer_name: customer_name,
            sale_price: sale_price,
            start_date: start_date,
            expected_end_date: expected_end_date,
            sales_order: sales_order,
            detail: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/projects/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((r) => {
                if(r.ok) return r.json();
                throw new Error("Something went wrong")
            })
            .then((patchedProject) => {
                patchProject(patchedProject);
                close();
            })
            .catch(error => console.log(error))
        }
    })



    return(
        <Form onSubmit={formik.handleSubmit}>
            <button onClick={close} className='btn-position'>X</button>
            <h2>Edit Project</h2>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Project Name" name="name"
                    value={formik.values.name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.name}</p>


                <Form.Input fluid label="Sales Order" name="sales_order"
                    value={formik.values.sales_order} onChange={formik.handleChange} type="number"/>
                <p style={{color: 'red'}}>{formik.errors.sales_order}</p>

                <Form.Input fluid label="Customer Name" name="customer_name"
                    value={formik.values.customer_name} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.customer_name}</p>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Start Date" name="start_date"
                    value={formik.values.start_date} onChange={formik.handleChange} type="date"/>
                <p style={{color: 'red'}}>{formik.errors.start_date}</p>

                <Form.Input fluid label="Expected End Date" name="expected_end_date"
                    value={formik.values.expected_end_date} onChange={formik.handleChange} type="date"/>
                <p style={{color: 'red'}}>{formik.errors.expected_end_date}</p>
                
                <Form.Input fluid label="Sale Price" name="Sale Price" 
                    value={formik.values.sale_price} onChange={formik.handleChange} type="number"/>
                <p style={{color: 'red'}}>{formik.errors.sale_price}</p>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea fluid label="Comment" name="comment"
                    value={formik.values.comment} onChange={formik.handleChange}/>

                <Form.TextArea fluid label="Change Detail" name="detail"
                    value={formik.values.detail} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.detail}</p>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default ProjectPatchForm;


