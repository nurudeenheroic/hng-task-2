export const invoiceStatus = document.querySelectorAll('.invoice-status p');
export const invoiceStatusContainers = document.querySelectorAll('.invoice-status');
export const statusIndicator = document.querySelectorAll('.status-indicator');
export  const invoices = [

    {
        id: 'XM9141',
        projectDescription: "Graphic Design",
        status: "Pending",
        billFrom: {
            streetAddress: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom"
        },
        clientInfo: {
        name: "Alex Grim",
        email: "alexgrim@mail.com",
        address: "84 Church Way",
        city: "Bradford",
        postCode: "BD1 9PB",
        country: "United Kingdom"
        },
        invoiceDetails: {
        date: "2021-08-21",
        dueDate: "2021-09-21",
        invoiceNumber: "INV-001"
        },
        items: [
        { description: "Banner Design", quantity: 1, rate: 156 },
        { description: "Email Design", quantity: 2, rate: 200 }
        ]
        
    },
    {
        id: 'RT3080',
        projectDescription: "Re-branding",
        status: "Paid",
        billFrom: {
            streetAddress: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom"
        },
        clientInfo: {
        name: "Jensen Huang",
        email: "jensenh@mail.com",
        address: "106 Kendal Street",
        city: "Sharrington",
        postCode: "NR24 5NQ",
        country: "United Kingdom"
        },
        invoiceDetails: {
        date: "2021-08-18",
        dueDate: "2021-08-19",
        invoiceNumber: "INV-002"
        },
        items: [
        { description: "Brand Guidelines", quantity: 1, rate: 1800.9 }
        ]
    },
    {
        id: 'RG0314',
        projectDescription: "Website Redesign",
        status: "Paid",
        billFrom: {
            streetAddress: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom"
        },
        clientInfo: {
        name: "John Morrison",
        email: "johnm@mail.com",
        address: "79 Dover Road",
        city: "Westhall",
        postCode: "IP19 8QU",
        country: "United Kingdom"
        },
        invoiceDetails: {
        date: "2021-08-18",
        dueDate: "2021-08-19",
        invoiceNumber: "INV-003"
        },
        items: [
        { description: "Website Redesign", quantity: 1, rate: 14002.33 }
        ]
    },
    {
        id: 'RT2080',
        projectDescription: "Logo Design",
        status: "Pending",
        billFrom: {
            streetAddress: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom"
        },
        clientInfo: {
        name: "Alysa Werner",
        email: "alysaw@mail.com",
        address: "63 Warwick Road",
        city: "Carlisle",
        postCode: "CA1 1SL",
        country: "United Kingdom"
        },
        invoiceDetails: {
        date: "2021-11-10",
        dueDate: "2021-11-11",
        invoiceNumber: "INV-004"
        },
        items: [
        { description: "Logo Design", quantity: 1, rate: 102.04 }
        ]
    },
    {
        id: 'AA1449',
        projectDescription: "App Design",
        status: "Pending",
        billFrom: {
            streetAddress: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom"
        },
        clientInfo: {
        name: "Mellisa Clarke",
        email: "mellisa.clarke@example.com",
        address: "46 Abbey Row",
        city: "Cambridge",
        postCode: "CB5 8AB",
        country: "United Kingdom"
        },
        invoiceDetails: {
        date: "2021-07-10",
        dueDate: "2021-07-17",
        invoiceNumber: "INV-005"
        },
        items: [
        { description: "App Interface", quantity: 1, rate: 4032.33 }
        ]
    }
    ];