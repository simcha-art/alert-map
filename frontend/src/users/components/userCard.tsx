import type { User } from '../../types.ts'

interface Prop {
    user: User
}

function userCard({user}: Prop) {
  return (
    <div>
        <h3>{user.username}</h3>
        <h3>{user.role}</h3>
        <p>{user.assignedArena}</p>
        <p>{user.email}</p>
    </div>
  )
}

export default userCard