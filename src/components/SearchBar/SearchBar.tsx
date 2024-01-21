import React from "react"
import { Form } from "semantic-ui-react"

interface ISearchBarProps {
  placeholder: string
  initialText?: string
  change?: (input: string) => void
}

const SearchBar = (props: ISearchBarProps) => {

  const { placeholder, change, initialText } = props

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (change) {
      change(event.target.value)
    }
  }

  return (
    <Form>
      <Form.Input
        fluid
        id='form-subcomponent-shorthand-input-first-name'
        placeholder={placeholder}
        value={initialText}
        onChange={inputChanged}
      />
    </Form>
  )
}

export default SearchBar
