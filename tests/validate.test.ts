import "@testing-library/jest-dom";
import { validate } from "../components/Form";

describe("Validate function test", () => {
  it("All empty values", () => {
    const result = validate({ email: "", firstName: "", gender: "", lastName: "", phoneNumber: "" });
    expect(result.firstName).toBe("First name is required!");
    expect(result.lastName).toBe("Last name is required!");
    expect(result.email).toBe("Email is required!");
    expect(result.phoneNumber).toBe("Phone number is required!");
    expect(result.gender).toBe("Gender is required!");
  });

  it("All correct values", () => {
    const result = validate({ email: "sample@mail.com", firstName: "asdasd", gender: "MALE", lastName: "asdasd", phoneNumber: "+94111111111" });
    expect(result.firstName).toBe(undefined);
    expect(result.lastName).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.phoneNumber).toBe(undefined);
    expect(result.gender).toBe(undefined);
  });

  it("Phone number check", () => {
    const result = validate({ email: "sample@mail.com", firstName: "asdasd", gender: "MALE", lastName: "asdasd", phoneNumber: "+94111111" });
    expect(result.firstName).toBe(undefined);
    expect(result.lastName).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.phoneNumber).toBe("Enter valid LK phone number. ex - +94711234567");
    expect(result.gender).toBe(undefined);
  });
  it("min and max charactes check", () => {
    const result = validate({ email: "sample@mail.com", firstName: "asd", gender: "MALE", lastName: "asdasddfgdfgdfg", phoneNumber: "+94111111111" });
    expect(result.firstName).toBe("Min 6 character and max 10 characters");
    expect(result.lastName).toBe("Min 6 character and max 10 characters");
    expect(result.email).toBe(undefined);
    expect(result.phoneNumber).toBe(undefined);
    expect(result.gender).toBe(undefined);
  });
  it("Alphabatic characters check", () => {
    const result = validate({ email: "sample@mail.com", firstName: "asd", gender: "MALE", lastName: "asdasddfgdfgd2", phoneNumber: "+94111111111" });
    expect(result.firstName).toBe("Min 6 character and max 10 characters");
    expect(result.lastName).toBe("Alphabets only!");
    expect(result.email).toBe(undefined);
    expect(result.phoneNumber).toBe(undefined);
    expect(result.gender).toBe(undefined);
  });
  it("Email validation", () => {
    const result = validate({ email: "samplemail.com", firstName: "asd", gender: "MALE", lastName: "asdasddfgdfgd2", phoneNumber: "+94111111111" });
    expect(result.firstName).toBe("Min 6 character and max 10 characters");
    expect(result.lastName).toBe("Alphabets only!");
    expect(result.email).toBe("Email invalid");
    expect(result.phoneNumber).toBe(undefined);
    expect(result.gender).toBe(undefined);
  });
});
