import React, {ReactPropTypes, useState} from "react"
import { Form } from "semantic-ui-react"

interface ISearchBarProps {
  label: string
  placeholder: string
  children: string
  change?: (input: string) => void
  submit?: (input: string) => void
}

const SearchBar = (props: ISearchBarProps) => {

  const { label, placeholder, change, submit } = props

  const [ text, setText ] = useState("")

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const txt = event.target.value

    setText(txt)

    if (change) {
      change(txt)
    }
  }

  const didSubmit = (): void => {
    if (submit) {
      submit(text)
    }
  }

  return (
    <Form onSubmit={didSubmit}>
      <Form.Input
        fluid
        id='form-subcomponent-shorthand-input-first-name'
        label={label}
        placeholder={placeholder}
        onChange={inputChanged}
      />
    </Form>
  )
}

export default SearchBar
