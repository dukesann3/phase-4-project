import {Form, Button} from 'semantic-ui-react';
import '../component_CSS/form.css';

function ProjectAddForm({handleClick, handleSubmit, form, handleChange}){
    return(
        <>
            <Form onSubmit={handleSubmit}>
                <button className="btn-position" onClick={handleClick}>X</button>
                <h2>Project Add Form</h2>
                <Form.Group widths='equal'>
                    <Form.Input 
                    fluid label='Project Name' 
                    placeholder='Project Name' 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}/>

                    <Form.Input 
                    fluid label='Sales Order' 
                    placeholder='Sales Order' 
                    name="sales_order" 
                    type='number'
                    value={form.sales_order} 
                    onChange={handleChange}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                        fluid label='Customer Name'
                        placeholder='Customer Name'
                        name='customer_name'
                        value={form.customer_name}
                        onChange={handleChange}/>

                    <Form.Input 
                        fluid label='Sale Price'
                        placeholder='Sale Price'
                        name='sale_price'
                        value={form.sale_price}
                        type='number'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                        fluid label='Start Date'
                        name='start_date'
                        value={form.start_date}
                        type='date'
                        onChange={handleChange}
                    />
                    <Form.Input 
                        fluid label='Expected End Date'
                        name='expected_end_date'
                        value={form.expected_end_date}
                        type='date'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.TextArea 
                        fluid label="Comments"
                        placeholder='comments'
                        name='comments'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button>SUBMIT</Button>
            </Form>
        </>
    )
}

export default ProjectAddForm;

{/* <form onSubmit={handleSubmit}>
<input type="date" placeholder="start date" name="start_date" value={form.start_date} onChange={handleChange}></input>
<input type="date" placeholder="expected end date" name="expected_end_date" value={form.expected_end_date} onChange={handleChange}></input>
<input type="text" placeholder="comment" name="comment" value={form.comment} onChange={handleChange}></input>
<button>SUBMIT</button>
</form> */}