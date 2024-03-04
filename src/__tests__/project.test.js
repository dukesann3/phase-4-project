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
import {server} from '../msw/node';

server.listen();

const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
});

test("Does project tab have 3 project cards present?", async () => {

})