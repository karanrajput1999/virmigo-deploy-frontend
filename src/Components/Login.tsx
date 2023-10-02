import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getUser } from "../app/features/userSlice"
import { CircularProgress } from "@mui/material"

import URL from "../url"

interface formValues {
  email: string
  password: string
}
interface setHasLoggedInUserType {
  setHasLoggedInUser: (hasLoggedInUser: boolean) => void
}

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
})

function Login({ setHasLoggedInUser }: setHasLoggedInUserType) {
  const [authenticationError, setAuthenticationError] = useState("")
  const [userLoading, setUserLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    axios
      .get(`${URL}/login`, { withCredentials: true })
      .then((res) => {
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
      setUserLoading(true)
      axios
        .post(`${URL}/login`, values, { withCredentials: true })
        .then((res) => {
          setHasLoggedInUser(true)
          dispatch(getUser(res.data))
          navigate("/")
          setUserLoading(false)
        })
        .catch((error) => {
          console.log("error while loging in from frontend", error)
          setAuthenticationError(error.response.data)
        })
    },
    validationSchema,
  })

  return (
    <div className="flex flex-column ailgn-center login-container">
      <div className="flex content-center  login-title-container">
        <span className="login-title">Virmigo</span>
      </div>

      {authenticationError && (
        <span style={{ textAlign: "center", color: "red" }}>
          {authenticationError}
        </span>
      )}

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
          <button
            type="submit"
            className="flex align-center join-btn"
            disabled={userLoading ? true : false}
          >
            Login
            {userLoading ? (
              <CircularProgress size="1.5rem" sx={{ color: "white" }} />
            ) : null}
          </button>
        </div>
      </form>

      <span
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        Not a member ? <a href="/signup">Signup</a>{" "}
      </span>
    </div>
  )
}

export default Login
