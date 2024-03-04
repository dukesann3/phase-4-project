import Footer from "../components/Footer";
import {screen, render} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider, MemoryRouter } from "react-router-dom";
import routes from "../routes";
import "@testing-library/dom";
import "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/react";
import {jest,expect} from '@jest/globals';

//By the way, getByRole({},name). The name portion is the text

const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
});

test("renders without any errors", () => {
    const errorSpy = jest.spyOn(global.console, "error");
    render(<MemoryRouter><Footer /></MemoryRouter>);

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
});

test("Does Footer have useful links?", async () => {
    render(<MemoryRouter><Footer/></MemoryRouter>);

    const home = screen.getByRole('link', {
        name: /Home/i,
        className: 'footer-link',
    });

    const employees = screen.getByRole('link', {
        name: /Employees/i,
        className: 'footer-link',
    });

    const projects = screen.getByRole('link', {
        name: /Projects/i,
        className: 'footer-link'
    });

    expect(home).toBeInTheDocument();
    expect(employees).toBeInTheDocument();
    expect(projects).toBeInTheDocument();
});

test("Does Footer have addresses, phone numbers, and email?", async() => {
    render(<MemoryRouter><Footer /></MemoryRouter>);

    const phoneNumber = screen.getByText(/424/i, {
        className: "phone-numer-string"
    });
    const email = screen.getByText(/(.com)/i, {
        className: "email-string"
    });
    const address = screen.getByText(/(Pacific Ocean)/i, {
        className: "address-string"
    });

    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(address).toBeInTheDocument();

})

