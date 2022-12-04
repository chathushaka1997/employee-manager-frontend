import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Employee, formValues, Gender } from "../../models/Employee";
import { EmployeeService } from "../../services/EmployeeService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Form from "../../components/Form";

const add = () => {
  const initialValues = { firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" };
  const addEmployee = async (
    setAlertError: React.Dispatch<
      React.SetStateAction<{
        message: string;
        success: boolean;
      } | null>
    >,
    formValues: formValues,
    setFormValues:React.Dispatch<React.SetStateAction<formValues>>
  ) => {
    try {
      const employeeData: Partial<Employee> = { ...formValues, gender: formValues.gender as Gender };
      const addedEmployee = await EmployeeService.addEmployee(employeeData);
      if (addedEmployee.success) {
        setAlertError({ message: "Employee added", success: true });
        setFormValues(initialValues);
        console.log(addedEmployee);
      } else {
        if (addedEmployee.error) {
          setAlertError({ message: addedEmployee.error, success: false });
        } else {
          setAlertError({ message: "Add employee failed", success: false });
        }
      }
    } catch (error) {
      setAlertError({ message: "Server error", success: false });
    }
  };
  return (
    <div className="container-md mt-3  ">
      <div className="d-flex flex-row-reverse py-3 ">
        <Link href={"/employee/list"} className="btn btn-primary  rounded-pill fw-bold px-4">
          LIST VIEW
        </Link>
      </div>
      <div>
        <h2 className="text-center mb-4 text-secondary fw-bold">Add Employee</h2>
      </div>
      <Form callback={addEmployee} initialValues={initialValues} />
    </div>
  );
};

export default add;
