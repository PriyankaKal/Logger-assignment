
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import Filter from "../Filter";

test('Filter',()=>{
        render(<BrowserRouter><Filter/></BrowserRouter>);
        const placeholderElementtwo = screen.getByPlaceholderText(/select action type/i);
        const placeholderElementthree = screen.getByPlaceholderText(/select application type/i);
        const placeholderElementfour = screen.getByPlaceholderText(/Enter Application Id/i);
  
        const placeholderElementSix = screen.getByRole("button");
        
        expect(placeholderElementtwo).toBeInTheDocument();
        expect(placeholderElementthree).toBeInTheDocument();
        expect(placeholderElementfour).toBeInTheDocument();
        expect(placeholderElementSix).toBeInTheDocument();

})