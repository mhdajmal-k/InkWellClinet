import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, "firstName must be at least 3 letters")
    .max(20, "firstName must be less than 20 letters")
    .required("firstName is required"),
  lastName: Yup.string()
    .trim()
    .min(3, "firstName must be at least 3 letters")
    .max(20, "firstName must be less than 20 letters")
    .required("firstName is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password mustBe Strong one Alphabet Number,specialCharacter"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  dob: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});
