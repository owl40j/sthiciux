import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { MOCK_SUPPLIERS } from '../../data/constants'
import styles from '../FormPage.module.css'

export function SupplierMessagePage() {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((candidate) => candidate.id === supplierId) ?? MOCK_SUPPLIERS[0]
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="screen">
        <h1 className="screen-title">Message Sent</h1>
        <div className="card" role="status">
          Your message was sent to {supplier.name} in this prototype session.
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Button fullWidth onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Message Supplier</h1>
      <p className={styles.note}>Connected with {supplier.name}</p>
      <label className={styles.label} htmlFor="supplier-message">
        Message
      </label>
      <textarea
        id="supplier-message"
        className={styles.textarea}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask about availability, quantity, or pickup details…"
        rows={8}
      />
      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth disabled={!message.trim()} onClick={() => setSent(true)}>
          Send Message
        </Button>
      </div>
    </div>
  )
}
