import {Form, Button} from 'semantic-ui-react';
import '../assignment_components/assignmentCSS/universalForm.css';

function EmployeeAddForm({handleSubmit, form, handleChange, handleBtnClick}){

    return(
        <div className="form">
            <button className="btn-position" onClick={handleBtnClick}>X</button>
            <h2>Employee Add Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input 
                    fluid label='First Name' 
                    placeholder='First Name' 
                    name="first_name" 
                    value={form.first_name} 
                    onChange={handleChange}/>

                    <Form.Input 
                    fluid label='Last Name' 
                    placeholder='Last Name' 
                    name="last_name" 
                    value={form.last_name} 
                    onChange={handleChange}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                    fluid label='Department' 
                    placeholder='Department' 
                    name="department" 
                    value={form.department} 
                    onChange={handleChange}/>
                    
                    <Form.Input 
                    fluid label='Role' 
                    placeholder='Role' 
                    name="role" 
                    value={form.role} 
                    onChange={handleChange}/>
                </Form.Group>
                <Button>SUBMIT</Button>
            </Form>
        </div>
    )
}

export default EmployeeAddForm;



