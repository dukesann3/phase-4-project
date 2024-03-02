export const employees = [
    {
        id: 1,
        first_name: "John",
        last_name: "Johnson",
        department: "Purchasing",
        role: "Buyer",
        projects: [{
            id: 1,
            sales_order: 405600,
            name: "Hanwa Oil Cooler Project",
            start_Date: "2023-1-1",
            expected_end_date: "2024-3-4",
            customer_name: "Hanwa",
            sale_price: 120000,
            comment: "Wowzers",
            isComplete: false,
        }],
        assignments: [{
            id: 1,
            employee_id: 1,
            project_id: 1,
            name: "Finish Drawings",
            comments: "Will take more than a week",
            start_date: "2023-2-1",
            expected_end_date: "2023-5-6",
            isComplete: false
        }]
    },
    {
        id: 2,
        first_name: "Susan",
        last_name: "White",
        department: "Engineering",
        role: "Designer",
        projects: [{
            id: 2,
            sales_order: 453498,
            name: "DSME Vaporizer Project",
            start_Date: "2022-1-1",
            expected_end_date: "2025-6-5",
            customer_name: "DSME",
            sale_price: 500000,
            comment: "A whole lotta money",
            isComplete: false,
        }],
        assignments: [{
            id: 2,
            employee_id: 2,
            project_id: 2,
            name: "Finish BOM Creation",
            comments: "Use go-by drawing",
            start_date: "2023-2-2",
            expected_end_date: "2023-4-29",
            isComplete: false
        }]
    },
    {
        id: 3,
        first_name: "Naomi",
        last_name: "Armani",
        department: "Management",
        role: "Project Manager",
        projects: [{
            id: 3,
            sales_order: 454345,
            name: "KSOE Fueling System Project",
            start_Date: "2023-2-23",
            expected_end_date: "2026-6-5",
            customer_name: "KSOE",
            sale_price: 400000,
            comment: "Valve takes too long to get here",
            isComplete: false,
        }],
        assignments: [{
            id: 3,
            employee_id: 3,
            project_id: 3,
            name: "Get Pump Quote",
            comments: "Get Lead Time",
            start_date: "2023-2-24",
            expected_end_date: "2023-2-28",
            isComplete: false
        }]
    }
]

export const projects = [
    {
        id: 1,
        sales_order: 405600,
        name: "Hanwa Oil Cooler Project",
        start_Date: "2023-1-1",
        expected_end_date: "2024-3-4",
        customer_name: "Hanwa",
        sale_price: 120000,
        comment: "Wowzers",
        isComplete: false,
        employees: [{
            id: 1,
            first_name: "John",
            last_name: "Johnson",
            department: "Purchasing",
            role: "Buyer",
        }],
        assignments: [{
            id: 1,
            employee_id: 1,
            project_id: 1,
            name: "Finish Drawings",
            comments: "Will take more than a week",
            start_date: "2023-2-1",
            expected_end_date: "2023-5-6",
            isComplete: false
        }]
    },
    {
        id: 2,
        sales_order: 453498,
        name: "DSME Vaporizer Project",
        start_Date: "2022-1-1",
        expected_end_date: "2025-6-5",
        customer_name: "DSME",
        sale_price: 500000,
        comment: "A whole lotta money",
        isComplete: false,
        employees: [{
            id: 2,
            first_name: "Susan",
            last_name: "White",
            department: "Engineering",
            role: "Designer",
        }],
        assignments: [{
            id: 2,
            employee_id: 2,
            project_id: 2,
            name: "Finish BOM Creation",
            comments: "Use go-by drawing",
            start_date: "2023-2-2",
            expected_end_date: "2023-4-29",
            isComplete: false
        }]
    },
    {
        id: 3,
        sales_order: 454345,
        name: "KSOE Fueling System Project",
        start_Date: "2023-2-23",
        expected_end_date: "2026-6-5",
        customer_name: "KSOE",
        sale_price: 400000,
        comment: "Valve takes too long to get here",
        isComplete: false,
        employees: [{
            id: 3,
            first_name: "Naomi",
            last_name: "Armani",
            department: "Management",
            role: "Project Manager",
        }],
        assignments: [{
            id: 3,
            employee_id: 3,
            project_id: 3,
            name: "Get Pump Quote",
            comments: "Get Lead Time",
            start_date: "2023-2-24",
            expected_end_date: "2023-2-28",
            isComplete: false
        }]
    }
    
]

export const assignments = [
    {
        id: 1,
        employee_id: 1,
        project_id: 1,
        name: "Finish Drawings",
        comments: "Will take more than a week",
        start_date: "2023-2-1",
        expected_end_date: "2023-5-6",
        isComplete: false,
        employee: {
            id: 1,
            first_name: "John",
            last_name: "Johnson",
            department: "Purchasing",
            role: "Buyer",
        },
        project: {
            id: 1,
            sales_order: 405600,
            name: "Hanwa Oil Cooler Project",
            start_Date: "2023-1-1",
            expected_end_date: "2024-3-4",
            customer_name: "Hanwa",
            sale_price: 120000,
            comment: "Wowzers",
            isComplete: false,
        }
    },
    {
        id: 2,
        employee_id: 2,
        project_id: 2,
        name: "Finish BOM Creation",
        comments: "Use go-by drawing",
        start_date: "2023-2-2",
        expected_end_date: "2023-4-29",
        isComplete: false,
        employee: {
            id: 2,
            first_name: "Susan",
            last_name: "White",
            department: "Engineering",
            role: "Designer",
        },
        project: {
            id: 2,
            sales_order: 453498,
            name: "DSME Vaporizer Project",
            start_Date: "2022-1-1",
            expected_end_date: "2025-6-5",
            customer_name: "DSME",
            sale_price: 500000,
            comment: "A whole lotta money",
            isComplete: false,
        }
    },
    {
        id: 3,
        employee_id: 3,
        project_id: 3,
        name: "Get Pump Quote",
        comments: "Get Lead Time",
        start_date: "2023-2-24",
        expected_end_date: "2023-2-28",
        isComplete: false,
        employee: {
            id: 3,
            first_name: "Naomi",
            last_name: "Armani",
            department: "Management",
            role: "Project Manager",
        },
        project: {
            id: 3,
            sales_order: 454345,
            name: "KSOE Fueling System Project",
            start_Date: "2023-2-23",
            expected_end_date: "2026-6-5",
            customer_name: "KSOE",
            sale_price: 400000,
            comment: "Valve takes too long to get here",
            isComplete: false,
        }
    }
]


