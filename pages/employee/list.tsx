import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GridView from "../../components/GridView";
import ListView from "../../components/ListView";
import { Employee } from "../../models/Employee";
import { EmployeeService } from "../../services/EmployeeService";
import { useSelector, useDispatch } from "react-redux";
import { removeEmployee, setEmployeeList } from "../../redux/employees";
import { RootState } from "../../redux/store";
import ToastAlert from "../../components/common/ToastAlert";

enum CurrentView {
  LIST = "LIST",
  GRID = "GRID",
}
export async function getServerSideProps() {
  try {
    const employeeList = await EmployeeService.getEmployeeList();
    if (employeeList.success) {
      return {
        props: {
          employeeListInit: employeeList.data,
        },
      };
    } else {
      return {
        props: {
          resError: employeeList.error,
        },
      };
    }
  } catch (error) {}
}
const list: React.FC<{
  employeeListInit: Employee[];
  resError: string;
}> = ({ employeeListInit, resError }) => {
  const employeeListFromStore = useSelector((state: RootState) => state.employees.employeeList);
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState(CurrentView.GRID);
  const [employeeList, setEmployeeListInner] = useState<Employee[]>(employeeListInit);
  const [showToastAlert, setShowToastAlert] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "" });

  const toggleView = () => {
    if (currentView == CurrentView.GRID) {
      setCurrentView(CurrentView.LIST);
    } else {
      setCurrentView(CurrentView.GRID);
    }
  };

  useEffect(() => {
    dispatch(setEmployeeList(employeeList));
    console.log(employeeList);
    console.log(resError);
  }, []);
  useEffect(() => {
    setEmployeeListInner(employeeListFromStore);
  }, [employeeListFromStore]);

  const deleteEmployee = async (empId: string, name:string) => {
    if (confirm(`Confirm delete '${name}'`)) {
      try {
        const deleteEmployee = await EmployeeService.deleteEmployee(empId);
        if (deleteEmployee.success) {
          console.log(deleteEmployee.data);
          dispatch(removeEmployee(empId));
          setShowToastAlert(true);
          console.log(employeeListFromStore);
          setAlertData({ message: `${deleteEmployee.data.firstName} deleted`, type: "success" });
        } else {
          console.log(deleteEmployee.error);
          setShowToastAlert(true);
          setAlertData({ message: deleteEmployee?.error || "Something went wrong", type: "danger" });
        }
      } catch (error) {
        console.log(error);
        setShowToastAlert(true);
        setAlertData({ message: "Server error", type: "danger" });
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-row-reverse py-3 ">
        <button className="btn btn-primary rounded-circle color-light" onClick={toggleView}>
          <Image src={currentView == CurrentView.GRID ? "/listIcon.svg" : "/gridIcon.svg"} alt="List view" width={15} height={15} className="" />
        </button>
        <Link href={"/employee/add"} className="btn btn-primary  rounded-pill fw-bold  me-3 px-4">
          ADD EMPLOYEE
        </Link>
      </div>
      {employeeList.length > 0 ? (
        <>
          {currentView == CurrentView.GRID ? (
            <GridView employeeList={employeeList} deleteEmployee={deleteEmployee}/>
          ) : (
            <ListView employeeList={employeeList} deleteEmployee={deleteEmployee} />
          )}
        </>
      ) : (
        <>
          <h5 className="text-center mt-5 fw-bold text-secondary">No Employees Available...</h5>
        </>
      )}

      <ToastAlert setShowToastAlert={setShowToastAlert} showToastAlert={showToastAlert} alertData={alertData} />
    </div>
  );
};

export default list;
