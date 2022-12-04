import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Employee } from "../models/Employee";

const ListView: React.FC<{
  employeeList: Employee[];
  deleteEmployee: (empId: string, name: string) => Promise<void>;
}> = ({ employeeList, deleteEmployee }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee._id}>
              <th scope="row">
                <img
                  style={{ height: "50px", width: "50px", objectFit: "cover" }}
                  src={employee.photo || "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
                  alt=""
                  className="rounded-circle"
                />
              </th>
              <td className="align-middle">{employee.firstName}</td>
              <td className="align-middle">{employee.lastName}</td>
              <td className="align-middle">{employee.email}</td>
              <td className="align-middle">{employee.phoneNumber}</td>
              <td className="align-middle">{employee.gender}</td>
              <td className="align-middle">
                {" "}
                <button
                  className="btn btn-danger rounded-circle color-light me-1"
                  onClick={() => deleteEmployee(employee._id, `${employee.firstName} ${employee.lastName}`)}
                >
                  <Image src="/deleteIcon.svg" alt="Delete user" width={15} height={15} className="" />
                </button>
                <Link href={`/employee/edit/${employee._id}`} className="btn btn-success rounded-circle color-light">
                  <Image src="/editIcon.svg" alt="Edit user" width={15} height={15} className="" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
