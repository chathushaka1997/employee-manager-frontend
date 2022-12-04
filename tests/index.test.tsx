import Home from "../pages/employee/add";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />)

    const heading = screen.getByText(/LIST VIEW/i)
    expect(heading).toBeInTheDocument()


  })
})