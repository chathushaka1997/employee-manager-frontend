import React, { useEffect, useState } from "react";
import { formValues, Gender } from "../models/Employee";

export const validate = (values: formValues) => {
  const errors: Partial<formValues> = {};
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
  const phoneRegex = /\+94+[0-9]{9}$/;
  const nameRegex = /^[A-Za-z]+$/i;
  if (!values.firstName) {
    errors.firstName = "First name is required!";
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = "Alphabets only!";
  } else if (values.firstName.length < 6 || values.firstName.length > 10) {
    errors.firstName = "Min 6 character and max 10 characters";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required!";
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = "Alphabets only!";
  } else if (values.lastName.length < 6 || values.lastName.length > 10) {
    errors.lastName = "Min 6 character and max 10 characters";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email invalid";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone number is required!";
  } else if (!phoneRegex.test(values.phoneNumber)) {
    errors.phoneNumber = "Enter valid LK phone number. ex - +94711234567";
  }
  if (!values.gender) {
    errors.gender = "Gender is required!";
  }
  return errors;
};

const Form: React.FC<{
  initialValues: formValues;
  callback: (
    setAlertError: React.Dispatch<
      React.SetStateAction<{
        message: string;
        success: boolean;
      } | null>
    >,
    formValues: formValues,
    setFormValues: React.Dispatch<React.SetStateAction<formValues>>,
    file:File
  ) => Promise<void>;
}> = ({ initialValues, callback }) => {
  //const initialValues = { firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" };
  const [formValues, setFormValues] = useState<formValues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<formValues>>();
  const [isSubmit, setIsSubmit] = useState(false);
  const [alertError, setAlertError] = useState<{ message: string; success: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null |undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (formErrors) {
      if (Object?.keys(formErrors).length === 0 && isSubmit) {
        submitForm();
      }
    }
  }, [formErrors]);
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);


  const submitForm = async () => {
    setIsLoading(true);
    await callback(setAlertError, formValues, setFormValues,file as File);
    setIsLoading(false);
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="shadow p-5 w-100" style={{ maxWidth: "700px" }}>
        {alertError && (
          <div className={`alert ${alertError.success ? "alert-success" : "alert-danger"} alert-dismissible fade show`} role="alert">
            {alertError.message}
            <button onClick={() => setAlertError(null)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className={`form-control ${formErrors?.firstName && "border-danger"}`}
              id="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <div className="form-text text-danger">{formErrors?.firstName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control ${formErrors?.lastName && "border-danger"}`}
              name="lastName"
              id="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            <div className="form-text text-danger">{formErrors?.lastName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${formErrors?.email && "border-danger"}`}
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="form-text text-danger">{formErrors?.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              className={`form-control ${formErrors?.phoneNumber && "border-danger"}`}
              id="phoneNumber"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
            <div className="form-text text-danger">{formErrors?.phoneNumber}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>

            <select
              className={`form-select ${formErrors?.gender && "border-danger"}`}
              id="gender"
              name="gender"
              onChange={handleChange}
              value={formValues.gender}
            >
              <option>Select gender</option>
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
            </select>
            <div className="form-text text-danger">{formErrors?.gender}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="form-label">
              Photo
            </label>

            <input
              type="file"
              className={`form-control ${formErrors?.photo && "border-danger"}`}
              id="inputGroupFile01"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  if (file && file.type.substring(0, 5) === "image") {
                    setFile(file);
                  } else {
                    setFormErrors({ ...formErrors, photo: "Only images are allowed" });
                  }
                }
              }}
            />

            <div className="form-text text-danger">{formErrors?.photo}</div>
          </div>
          <div className="d-flex flex-row-reverse">
            <button type="submit" className="btn px-5 btn-primary" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
