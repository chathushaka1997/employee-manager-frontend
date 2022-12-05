import Form from "../components/Form";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedFunc = jest.fn()
const emptyInitialValue = { firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" };

describe('Testing form component', () => {
    it('Providing empty initial values and submit', () => {
      render(<Form callback={mockedFunc} initialValues={emptyInitialValue} />)
  
      const buttonElement = screen.getByText(/submit/i)
      fireEvent.click(buttonElement)
      const errorText = screen.getByText(/First name is required!/i)
      expect(errorText).toBeInTheDocument()
  
  
    })

    it('testing firstname with numbers', () => {
        render(<Form callback={mockedFunc} initialValues={{ firstName: "123", lastName: "", email: "", phoneNumber: "", gender: "" }} />)
    
        const buttonElement = screen.getByText(/submit/i)
        fireEvent.click(buttonElement)
        const errorText = screen.getByText(/Alphabets only!/i)
        expect(errorText).toBeInTheDocument()
    
    
      })

    it('Providing firstname with characters less than 6', () => {
        render(<Form callback={mockedFunc} initialValues={{ firstName: "abc", lastName: "", email: "", phoneNumber: "", gender: "" }} />)
    
        const buttonElement = screen.getByText(/submit/i)
        fireEvent.click(buttonElement)
        const errorText = screen.getByText(/Min 6 character and max 10 characters/i)
        expect(errorText).toBeInTheDocument()
    
    
      })
  
  })

