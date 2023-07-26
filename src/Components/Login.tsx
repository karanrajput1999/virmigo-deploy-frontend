import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getUser } from "../app/features/userSlice"

interface formValues {
  email: string
  password: string
}

const initialValues = {
  email: "",
  password: "",
}

// const onSubmit =

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
})

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    axios
      .get("http://localhost:3000/login", { withCredentials: true })
      .then((res) => {
        console.log("while making get request to login", res.data)

        if (res.data) {
          dispatch(getUser(res.data))
          navigate("/")
        } else {
          navigate("/login")
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const formik = useFormik<formValues>({
    initialValues,
    onSubmit: (values: formValues) => {
      // Handle form submission logic here
      axios
        .post("http://localhost:3000/login", values, { withCredentials: true })
        .then((res) => {
          console.log("login post response from frontend", res.data)
          dispatch(getUser(res.data))
          navigate("/")
        })
        .catch((error) => {
          console.log("error while loging in from frontend", error)
        })
    },
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
        <div className="flex content-center join-btn-container">
          <button type="submit" className="join-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
