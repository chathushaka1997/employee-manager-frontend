import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Employee} from '../models/Employee'

export interface EmployeesState {
    employeeList: Employee[]
    currentEmployee:Employee|null
}

const initialState: EmployeesState = {
  employeeList: [],
  currentEmployee:null
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeList: (state,action: PayloadAction<Employee[]>) => {
      state.employeeList = action.payload
    },
    setCurrentEmployee: (state,action: PayloadAction<Employee>) => {
        state.currentEmployee = action.payload
    },
    setCurrentEmployeeById: (state,action: PayloadAction<string>) => {
        const selectedEmployee = state.employeeList.find(employee=>employee._id == action.payload)
        if(selectedEmployee){
            state.currentEmployee = selectedEmployee
        }
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employeeList = state.employeeList.filter(employee=>employee._id !=action.payload)
      console.log(state.employeeList);
      
    },
  },
})

export const { setEmployeeList, setCurrentEmployee, setCurrentEmployeeById,removeEmployee } = employeesSlice.actions

export default employeesSlice.reducer