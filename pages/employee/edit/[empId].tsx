import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCurrentEmployeeById } from "../../../redux/employees";
import { Employee, formValues, Gender } from "../../../models/Employee";
import { EmployeeService } from "../../../services/EmployeeService";
import Link from "next/link";
import Form from "../../../components/Form";
import { uploadImage } from "../add";

const editEmplyeeData = () => {
  const router = useRouter();
  const { empId } = router.query;
  const currentEmployee = useSelector((state: RootState) => state.employees.currentEmployee);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" });
  useEffect(() => {
    dispatch(setCurrentEmployeeById(empId as string));
    console.log(currentEmployee);
    if (currentEmployee) {
      setInitialValues({
        firstName: currentEmployee?.firstName,
        lastName: currentEmployee?.lastName,
        email: currentEmployee?.email,
        phoneNumber: currentEmployee?.phoneNumber,
        gender: currentEmployee?.gender,
      });
    }
  }, [currentEmployee]);

  const updateEmployee = async (
    setAlertError: React.Dispatch<
      React.SetStateAction<{
        message: string;
        success: boolean;
      } | null>
    >,
    formValues: formValues,
    setFormValues: React.Dispatch<React.SetStateAction<formValues>>,
    file:File
  ) => {
    try {
      const imageUrl = await uploadImage(file);
      const employeeData: Partial<Employee> = { ...formValues, gender: formValues.gender as Gender, photo: imageUrl || undefined };
      const addedEmployee = await EmployeeService.updateEmployee(empId as string, employeeData);
      if (addedEmployee.success) {
        setAlertError({ message: "Employee details updated", success: true });
      } else {
        if (addedEmployee.error) {
          setAlertError({ message: addedEmployee.error, success: false });
        } else {
          setAlertError({ message: "Edit employee failed", success: false });
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
        <h2 className="text-center mb-4 text-secondary fw-bold">Edit Employee</h2>
      </div>
      <Form callback={updateEmployee} initialValues={initialValues} />
    </div>
  );
};

export default editEmplyeeData;
