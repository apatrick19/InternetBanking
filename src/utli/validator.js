import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("BVN is required")
    .test("len", "Must be exactly 11 characters", (val) => val?.length === 11),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .max(11, "Password can't be more than 11 characters")
    .matches(
      /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number"
    ),

  email: Yup.string().email("Invalid email"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required"),
});

export const signinSchema = Yup.object().shape({
  accountNo: Yup.string()
    .required("Account Number is required")
    .test("len", "Must be exactly 10 characters", (val) => val?.length === 10),

  password: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required"),
});

export const transferpSchema = Yup.object().shape({
  accountNo: Yup.string()
    .required("Account Number is required")
    .test("len", "Must be exactly 11 characters", (val) => val?.length === 10),
});

export const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required"),

  confirmNewPassword: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required")
    .oneOf([Yup.ref("newPassword")], "Your passwords do not match."),
});

export const changePinSchema = Yup.object().shape({
  newPin: Yup.string()
    .required("Password is required")
    .min(4, "minimun of six character is required"),

  confirmNewPin: Yup.string()
    .required("Password is required")
    .min(4, "minimun of six character is required")
    .oneOf([Yup.ref("newPin")], "Your passwords do not match."),
});

export const forgetPasswordSchema = Yup.object().shape({
  accountNo: Yup.string()
    .required("Account Number is required")
    .test("len", "Must be exactly 11 characters", (val) => val?.length === 10),
});

export const resetPasswordSchema = Yup.object().shape({
  createNewPassword: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required"),

  confirmNewPassword: Yup.string()
    .required("Password is required")
    .min(6, "minimun of six character is required")
    .oneOf([Yup.ref("createNewPassword")], "Your passwords do not match."),
});
