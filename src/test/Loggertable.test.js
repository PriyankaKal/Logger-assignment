import { render, screen } from "@testing-library/react";
import Loggertable from "../Loggertable";
import { BrowserRouter } from "react-router-dom";


test('Loggertable',()=>{
  render(<BrowserRouter><Loggertable/></BrowserRouter>);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
})