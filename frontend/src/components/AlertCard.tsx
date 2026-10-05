import type { Alert } from "../types"

interface CardProp {
    alert: Alert
}

function AlertCard({alert}: CardProp) {
    const isSever = alert.status === "Active" && alert.priority === "Critical"
    const isHandled = alert.status === "Handled"
  return (
    <article className="alert-card" style={{backgroundColor: isHandled ? "green" : isSever? "red" : "orange"}}>
        <div className="severity-part">
            <h2>Priority: {alert.priority}</h2>
            <h3>Status: {alert.status}</h3>
        </div>
        <div className="description-part">
            <p>arena: {alert.arena}</p>
            <p>display name: {alert.displayName}</p>
        </div>
    </article>
  )
}

export default AlertCard