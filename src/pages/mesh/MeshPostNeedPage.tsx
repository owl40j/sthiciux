import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import styles from '../FormPage.module.css'

export function MeshPostNeedPage() {
  const navigate = useNavigate()
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [posted, setPosted] = useState(false)

  if (posted) {
    return (
      <div className="screen">
        <h1 className="screen-title">Need Posted</h1>
        <div className="card" role="status">
          Your need for {quantity} {item} is now visible to the barangay mesh.
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Button fullWidth onClick={() => navigate('/mesh')}>
            Return to Mesh Board
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Post a Need</h1>
      <label className={styles.label} htmlFor="needed-item">Item needed</label>
      <input
        id="needed-item"
        className={styles.input}
        value={item}
        onChange={(event) => setItem(event.target.value)}
        placeholder="e.g. Cooking oil"
      />
      <label className={styles.label} htmlFor="needed-quantity">Quantity</label>
      <input
        id="needed-quantity"
        className={styles.input}
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        placeholder="e.g. 20 liters"
      />
      <p className={styles.note}>Your business identity remains hidden until another business accepts.</p>
      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth disabled={!item.trim() || !quantity.trim()} onClick={() => setPosted(true)}>
          Post to Mesh
        </Button>
      </div>
    </div>
  )
}
