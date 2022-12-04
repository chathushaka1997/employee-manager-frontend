import axios from "axios";
import { Employee } from "../models/Employee";
import { AppResponse } from "../models/Response";

export namespace EmployeeService {
  export async function getEmployeeList(): Promise<AppResponse<Employee[]>> {
    const url = "http://localhost:3015/api/employee";
    return await (
      await axios.get(url)
    ).data;
  }
  export async function addEmployee(employeeData:Partial<Employee>): Promise<AppResponse<Employee>> {
    const url = "http://localhost:3015/api/employee";
    const data:Partial<Employee> = employeeData
    return await (
      await axios.post(url,data)
    ).data;
  }
  export async function updateEmployee(employeeId:string,employeeData:Partial<Employee>): Promise<AppResponse<Employee>> {
    const url = "http://localhost:3015/api/employee/"+employeeId;
    const data:Partial<Employee> = employeeData
    return await (
      await axios.put(url,data)
    ).data;
  }
  export async function deleteEmployee(employeeId:string): Promise<AppResponse<Employee>> {
    const url = "http://localhost:3015/api/employee/"+employeeId;
    return await (
      await axios.delete(url)
    ).data;
  }
}
