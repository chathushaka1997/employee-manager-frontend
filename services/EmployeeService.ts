import axios from "axios";
import { resourceUsage } from "process";
import { Employee } from "../models/Employee";
import { AppResponse } from "../models/Response";

export namespace EmployeeService {
  const setUrl = (routeName: string) => {
    return `http://localhost:3015/api/${routeName}`;
  };
  export async function getEmployeeList(keyword?: string, sortBy?: string): Promise<AppResponse<Employee[]>> {
    const url = setUrl("employee");
    return await (
      await axios.get(url, {
        params: {
          keyword: keyword,
          sortBy: sortBy,
        },
      })
    ).data;
  }
  export async function addEmployee(employeeData: Partial<Employee>): Promise<AppResponse<Employee>> {
    const url = setUrl("employee");
    const data: Partial<Employee> = employeeData;
    return await (
      await axios.post(url, data)
    ).data;
  }
  export async function updateEmployee(employeeId: string, employeeData: Partial<Employee>): Promise<AppResponse<Employee>> {
    const url = setUrl("employee/" + employeeId)
    const data: Partial<Employee> = employeeData;
    return await (
      await axios.put(url, data)
    ).data;
  }
  export async function deleteEmployee(employeeId: string): Promise<AppResponse<Employee>> {
    const url = setUrl("employee/" + employeeId)
    return await (
      await axios.delete(url)
    ).data;
  }
  export async function UploadImageToImageBB(image: FormData): Promise<AppResponse<{url:string}>> {
    const url = "https://api.imgbb.com/1/upload?key=ee8910f1272dbcc57c098782618b26c0";
    return await (
      await axios.post(url,image)
    ).data;
  }
}
