import NewUserForm from "../components/NewUserForm"

function AdminPage() {
  return (
    <div>
        <h2>Handle Users</h2>
        <div>
            <p>create new user</p>
            <NewUserForm />
        </div>
    </div>
  )
}

export default AdminPage