import Navbar from "../components/Navbar";
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
    render(<RouterProvider router={router} />);

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
});

test("Does navbar have links?", async () => {
    render(
    <MemoryRouter>
        <Navbar/>
    </MemoryRouter>
    );

    const home = screen.getByRole('link', {
        name: /Home/i,
        className: 'navbar-link',
    });

    const employees = screen.getByRole('link', {
        name: /Employees/i,
        className: 'navbar-link',
    });

    const projects = screen.getByRole('link', {
        name: /Projects/i,
        className: 'navbar-link'
    });

    expect(home).toBeInTheDocument();
    expect(employees).toBeInTheDocument();
    expect(projects).toBeInTheDocument();
});






