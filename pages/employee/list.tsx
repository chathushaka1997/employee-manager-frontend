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
  } catch (error) {
    return {
      props: {
        resError: "Server error",
      },
    };
  }
}
const List: React.FC<{
  employeeListInit: Employee[];
  resError: string;
}> = ({ employeeListInit, resError }) => {
  const employeeListFromStore = useSelector((state: RootState) => state.employees.employeeList);
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState(CurrentView.GRID);
  const [employeeList, setEmployeeListInner] = useState<Employee[]>(employeeListInit);
  const [showToastAlert, setShowToastAlert] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "" });
  const [sortOptions, setSortOptions] = useState({ keyword: "", sortBy: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

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

  const deleteEmployee = async (empId: string, name: string) => {
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

  const doSearchDropDown = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsSorting(true);
    try {
      setSortOptions({ ...sortOptions, [e.target.name]: e.target.value });
      const options = { ...sortOptions, [e.target.name]: e.target.value };
      const employeeList = await EmployeeService.getEmployeeList(options.keyword, options.sortBy);
      if (employeeList.success) {
        setEmployeeListInner(employeeList.data);
        dispatch(setEmployeeList(employeeList.data));
      } else {
        alert(employeeList.error);
      }
    } catch (error) {
      alert("Server error");
    }
    setIsSorting(false);
  };
  const doSearchSearchBar = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSearching(true);
    try {
      e.preventDefault();
      const employeeList = await EmployeeService.getEmployeeList(sortOptions.keyword, sortOptions.sortBy);
      if (employeeList.success) {
        setEmployeeListInner(employeeList.data);
        dispatch(setEmployeeList(employeeList.data));
      } else {
        alert(employeeList.error);
      }
    } catch (error) {
      alert("Server error");
    }
    setIsSearching(false);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-6 d-flex order-last order-md-first mt-4 mt-md-0">
          <form onSubmit={doSearchSearchBar} className="w-100 me-3">
            <div className="input-group mb-3 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="button-addon2"
                onChange={(e) => setSortOptions({ ...sortOptions, keyword: e.target.value })}
                name="keyword"
              />
              <button className="btn btn-outline-primary" type="submit" id="button-addon2" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          <div className="input-group mb-3">
            {isSorting && (
              <>
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                  Sorting...
                </label>
              </>
            )}

            <select className="form-select" id="inputGroupSelect01" placeholder="Sort..." onChange={doSearchDropDown} name="sortBy" disabled={isSorting}>
              <option value="none" selected>
                No Sort
              </option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-end">
          <div>
            <Link href={"/employee/add"} className="btn btn-primary  rounded-pill fw-bold  me-3 px-4">
              ADD EMPLOYEE
            </Link>
            <button className="btn btn-primary rounded-circle color-light" onClick={toggleView}>
              <Image src={currentView == CurrentView.GRID ? "/listIcon.svg" : "/gridIcon.svg"} alt="List view" width={15} height={15} className="" />
            </button>
          </div>
        </div>
      </div>
      {employeeList?.length > 0 ? (
        <>
          {currentView == CurrentView.GRID ? (
            <GridView employeeList={employeeList} deleteEmployee={deleteEmployee} />
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

export default List;
