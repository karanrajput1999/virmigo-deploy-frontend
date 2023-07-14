import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUser } from "../app/features/userSlice"

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

// const onSubmit =
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
  confirmPassword: Yup.string().required("Confirm Password is required!"),
})

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("http://localhost:3000/signup", { withCredentials: true })
      .then((res) => {
        console.log("get reqeust to signup", res)

        if (res.data) {
          dispatch(getUser(res.data))
          navigate("/")
        } else {
          navigate("/signup")
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const formik = useFormik<formValues>({
    initialValues,
    onSubmit: (values: formValues) => {
      console.log(values)
      axios
        .post("http://localhost:3000/signup", values)
        .then((res) => {
          console.log("singup response", res.data)

          dispatch(getUser(res.data))

          navigate("/")
        })
        .catch((err) => console.log("error while making signup rqst", err))
    },
    validationSchema,
  })

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
              {...formik.getFieldProps("name")}
              name="name"
              placeholder="John Doe"
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
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              name="email"
              placeholder="johndoe@gmail.com"
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
              {...formik.getFieldProps("password")}
              name="password"
              placeholder="Type your password..."
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
              {...formik.getFieldProps("confirmPassword")}
              name="confirmPassword"
              placeholder="Confirm your password..."
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
