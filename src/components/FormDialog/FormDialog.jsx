import './FormDialog.css'

export default function FormDialog({ title, fields, onClose, onSave }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(fields.map((field) => {
      const value = formData.get(field.name)
      return [field.name, field.type === 'number' ? Number(value) : String(value ?? '').trim()]
    }))
    onSave(values)
  }

  return <div className="form-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="form-dialog" role="dialog" aria-modal="true" aria-label={title}>
      <div className="form-dialog-heading"><h2>{title}</h2><button type="button" aria-label="Close" onClick={onClose}>×</button></div>
      <form onSubmit={handleSubmit}>
        <div className="form-dialog-fields">{fields.map((field) => <label key={field.name}>{field.label}
          {field.options ? <select name={field.name} defaultValue={field.defaultValue ?? field.options[0].value} required={field.required !== false}>
            {field.options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select> : <input name={field.name} type={field.type ?? 'text'} min={field.min} step={field.step} defaultValue={field.defaultValue} required={field.required !== false} />}
        </label>)}</div>
        <div className="form-dialog-actions"><button className="form-dialog-cancel" type="button" onClick={onClose}>Cancel</button><button className="form-dialog-save" type="submit">Save</button></div>
      </form>
    </section>
  </div>
}