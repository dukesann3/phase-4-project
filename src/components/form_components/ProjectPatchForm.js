import {Form, Button} from 'semantic-ui-react';
import '../component_CSS/form.css';

function ProjectPatchForm({handlePatch, close, handleChangeLog, handleChangePrj, form, logForm}){


    return(
        <Form onSubmit={handlePatch}>
            <button onClick={close} className='btn-position'>X</button>
            <h2>Edit Project</h2>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Project Name" name="name"
                    value={form.name} onChange={handleChangePrj}/>

                <Form.Input fluid label="Sales Order" name="sales_order"
                    value={form.sales_order} onChange={handleChangePrj} type="number"/>

                <Form.Input fluid label="Customer Name" name="customer_name"
                    value={form.customer_name} onChange={handleChangePrj}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Start Date" name="start_date"
                    value={form.start_date} onChange={handleChangePrj} type="date"/>

                <Form.Input fluid label="Expected End Date" name="expected_end_date"
                    value={form.expected_end_date} onChange={handleChangePrj} type="date"/>
                
                <Form.Input fluid label="Sale Price" name="Sale Price" 
                    value={form.sale_price} onChange={handleChangePrj} type="number"/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea fluid label="Comment" name="comment"
                    value={form.comment} onChange={handleChangePrj}/>

                <Form.TextArea fluid label="Change Detail" name="detail"
                    value={logForm.detail} onChange={handleChangeLog}/>
            </Form.Group>
            <Button>Submit</Button>
        </Form>
    )
}

export default ProjectPatchForm;


