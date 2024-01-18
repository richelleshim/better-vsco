import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app"
import { CssVarsProvider } from "@mui/joy"
import { theme } from "./theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
)
