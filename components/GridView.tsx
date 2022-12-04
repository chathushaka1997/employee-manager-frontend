import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Employee } from "../models/Employee";

const GridView: React.FC<{
  employeeList: Employee[];
  deleteEmployee: (empId: string, name: string) => Promise<void>;
}> = ({ employeeList, deleteEmployee }) => {
  return (
    <div className="row mt-4">
      {employeeList.map((employee) => (
        <div key={employee._id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="border position-relative">
            <img
              style={{ height: "200px", objectFit: "cover" }}
              className="w-100"
              src={employee.photo || "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
              alt={employee.firstName}
            />
            <div className="m-4 mt-2">
              <h5>{`${employee.firstName} ${employee.lastName}`}</h5>
              <h6>{employee.email}</h6>
              <p className="mb-1">{employee.phoneNumber}</p>
              <p className="">{employee.gender}</p>
            </div>
            <div className="position-absolute" style={{ bottom: "10px", right: "10px" }}>
              <button
                className="btn btn-danger rounded-circle color-light me-1"
                onClick={() => deleteEmployee(employee._id, `${employee.firstName} ${employee.lastName}`)}
              >
                <Image src="/deleteIcon.svg" alt="Delete user" width={15} height={15} className="" />
              </button>
              <Link href={`/employee/edit/${employee._id}`} className="btn btn-success rounded-circle color-light">
                <Image src="/editIcon.svg" alt="Edit user" width={15} height={15} className="" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
