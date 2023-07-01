export const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem("user"))
}