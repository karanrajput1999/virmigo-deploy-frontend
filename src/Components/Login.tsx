import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

interface formValues {
  email: string
  password: string
}

const initialValues = {
  email: "",
  password: "",
}

const onSubmit = (values: formValues) => {
  // Handle form submission logic here
  console.log(values)
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
})

function Login() {
  const formik = useFormik<formValues>({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <div className="flex flex-column ailgn-center login-container">
      <div className="flex content-center  login-title-container">
        <span className="login-title">Virmigo</span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex content-center login-input-field-container">
          <div className="flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              {...formik.getFieldProps("name")}
              name="email"
              id="email"
            />
            <div className="error-container">
              {formik.touched.email && formik.errors.email ? (
                <span> {formik.errors.email}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex content-center login-input-field-container">
          <div className="flex flex-column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Type your password..."
              {...formik.getFieldProps("password")}
              name="password"
            />
            <div className="error-container">
              {formik.touched.password && formik.errors.password ? (
                <span> {formik.errors.password}</span>
              ) : null}
            </div>
          </div>
        </div>
      </form>

      <div className="flex content-center join-btn-container">
        <button className="join-btn">Login</button>
      </div>
    </div>
  )
}

export default Login
