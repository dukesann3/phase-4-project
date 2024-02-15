import React from "react";
import { useEffect, useState } from "react";
import Employee from "./Employee";

function Employees(){

    const [employees, setEmployees] = useState([])
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        department: "",
        role: ""
    })

    useEffect(()=>{
        fetch('/employees')
        .then(r => r.json())
        .then(emp => setEmployees(emp))
    },[])

    function form_check(){
        for (const property in form) {
            if(form[property] === ""){
                return false
            }
        }
        return true
    }

    function handle_submit(event){
        event.preventDefault()

        if(form_check() === false){
            console.log("not filled out completely")
            //write something to notify user
            return 
        }

        fetch("/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then((r)=> r.json())
        .then((response) => {
            const {first_name, last_name, department, role} = response
            const newEmployee = {
                first_name: first_name,
                last_name: last_name,
                department: department,
                role: role
            }
            setEmployees([...employees, newEmployee])
        })

    }

    function handle_change(event){
        const name = event.target.name
        const value = event.target.value
        setForm({
            ...form,
            [name]: value
        })
    }


    return(
        <>
            {employees.map((employee)=>{
                const {first_name, last_name, department, role} = employee
                return <Employee first={first_name} last={last_name} department={department} role={role}/>
            })}
            <br/>
            <form onSubmit={handle_submit}>
                <input type="text" name="first_name" placeholder="first name" value={form.first_name} onChange={handle_change}></input>
                <input type="text" name="last_name" placeholder="last name" value={form.last_name} onChange={handle_change}></input>
                <input type="text" name="department" placeholder="department" value={form.department} onChange={handle_change}></input>
                <input type="text" name="role" placeholder="role" value={form.role} onChange={handle_change}></input>
                <button>Click Me</button>
            </form>
        </>
    )
}

export default Employees