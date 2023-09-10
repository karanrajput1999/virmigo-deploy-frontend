import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUser } from "../app/features/userSlice"
import FormData from "form-data"

interface formValues {
  name: string
  email: string
  // profilePic: any
  // coverPic: any
  password: string
  confirmPassword: string
}

const initialValues = {
  name: "",
  email: "",
  // profilePic: "",
  // coverPic: "",
  password: "",
  confirmPassword: "",
}

// const onSubmit =
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Name must be atleast 3 chars long!")
    .max(25, "Name can not be more than 25 chars!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(4, "Password must be atleast 4 chars long!")
    .max(20, "Password can not be more than 20 chars!"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required!")
    .oneOf([Yup.ref("password")], "Passwords do not match!"),
})

function Signup() {
  const [profilePic, setProfilePic] = useState(null)
  const [coverPic, setCoverPic] = useState(null)
  const [authenticationError, setAuthenticationError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("http://localhost:3000/signup", { withCredentials: true })
      .then((res) => {
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
      const formData = new FormData()

      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("password", values.password)
      formData.append("confirmPassword", values.confirmPassword)

      if (profilePic) {
        formData.append("profilePic", profilePic)
      }
      if (coverPic) {
        formData.append("coverPic", coverPic)
      }

      axios
        .post("http://localhost:3000/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(getUser(res.data))

          navigate("/")
        })
        .catch((err) => {
          console.log("error while making signup rqst", err),
            setAuthenticationError(err.response.data)
        })
    },
    validationSchema,
  })

  return (
    <div className="flex flex-column ailgn-center signup-container">
      <div className="flex content-center  signup-title-container">
        <span className="signup-title">Virmigo</span>
      </div>

      {authenticationError && (
        <span style={{ textAlign: "center", color: "red" }}>
          {authenticationError}
        </span>
      )}
      {/* <span></span> */}
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="flex flex-column align-center input-field-container">
          <div className="flex flex-column">
            <label htmlFor="name" className="text-label">
              Name
            </label>

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
            <label htmlFor="email" className="text-label">
              Email
            </label>
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
            <label htmlFor="password" className="text-label">
              Password
            </label>
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
            <label htmlFor="cofirmPassword" className="text-label">
              Confirm Password
            </label>
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
            <label className="pic-btn" htmlFor="profile-pic">
              Choose Profile Pic
            </label>
            <input
              type="file"
              id="profile-pic"
              name="profilePic"
              style={{ display: "none" }}
              onChange={(event) => setProfilePic(event.target.files[0])}
            />

            <label className="pic-btn" htmlFor="cover-pic">
              Choose Cover Pic
            </label>
            <input
              type="file"
              id="cover-pic"
              name="coverPic"
              style={{ display: "none" }}
              onChange={(event) => setCoverPic(event.target.files[0])}
            />
          </div>
        </div>

        <div className="flex content-center join-btn-container">
          <button type="submit" className="join-btn">
            Join Virmigo!
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
        Already a member ? <a href="/login">Login</a>{" "}
      </span>
    </div>
  )
}

export default Signup
