import React from "react"
import { CircularProgress } from "@mui/material"

function Loading() {
  return (
    <div
      style={{
        textAlign: "center",
        height: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ color: "#5600ac" }} />
    </div>
  )
}

export default Loading
