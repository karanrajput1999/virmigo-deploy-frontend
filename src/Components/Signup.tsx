import React from "react"
import { FormikValues, useFormik } from "formik"

interface formValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const onSubmit = (values: formValues) => {
  // Handle form submission logic here
  console.log(values)
}

const validate = (values: formValues) => {
  let errors: FormikValues = {}
  if (!values.name) {
    errors.name = "Name is required!"
  }
  if (!values.email) {
    errors.email = "Email is required!"
  } else if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email,
    )
  ) {
    errors.email = "Invalid email format!"
  }

  if (!values.password) {
    errors.password = "Password is required!"
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required!"
  }

  return errors
}

function Signup() {
  const formik = useFormik<formValues>({
    initialValues,
    onSubmit,
    validate,
  })

  console.log("Form errors", formik.errors)

  return (
    <div className="flex flex-column ailgn-center signup-container">
      <div className="flex content-center  signup-title-container">
        <span className="signup-title">Virmigo</span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-column align-center input-field-container">
          <div className="flex flex-column">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          <div className="error-container">
            {formik.touched.name && formik.errors.name ? (
              <span> {formik.errors.name}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-column align-center input-field-container">
          <div className="flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className="error-container">
            {formik.touched.email && formik.errors.email ? (
              <span> {formik.errors.email}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-column align-center input-field-container">
          <div className="flex flex-column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          <div className="error-container">
            {formik.touched.password && formik.errors.password ? (
              <span> {formik.errors.password}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-column align-center input-field-container">
          <div className="flex flex-column">
            <label htmlFor="cofirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </div>
          <div className="error-container">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <span> {formik.errors.confirmPassword}</span>
            ) : null}
          </div>
        </div>

        <div className="flex align-center flex-column pic-btn-container">
          <div className="flex pic-info-container">
            <span>* Profile pic and cover pic are optional.</span>
          </div>
          <div className="flex content-center pic-btn-wrapper">
            <button className="pic-btn">Choose profile pic</button>
            <button className="pic-btn">Choose cover pic</button>
          </div>
        </div>

        <div className="flex content-center join-btn-container">
          <button type="submit" className="join-btn">
            Join Virmigo!
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
