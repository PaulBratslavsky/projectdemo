import { useState } from 'react'

export default function useFormFields(initial = {}) {
  const [fields, setFields] = useState(initial)

  function handleSetFields(event) {
    let { name, value, type } = event.target

    if (type === 'file') [value] = event.target.files;

    setFields(fields => ({ ...fields, [name]: value }))
  }

  function resetFields() {
    setFields(initial)
  }

  return { fields, handleSetFields, resetFields }

}
