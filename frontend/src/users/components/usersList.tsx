import { useFetch } from "../../users/hooks/useFetch.ts"

function usersList() {
    const {loading, error, data} = useFetch("users")
  return (
    <div>usersList</div>
  )
}

export default usersList