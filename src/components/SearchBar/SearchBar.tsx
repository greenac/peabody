import React, {ReactPropTypes, useState} from "react"
import { Form } from "semantic-ui-react"

interface ISearchBarProps {
  placeholder: string
  change?: (input: string) => void
}

const SearchBar = (props: ISearchBarProps) => {

  const { placeholder, change } = props

  const [ text, setText ] = useState("")

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const txt = event.target.value

    setText(txt)

    if (change) {
      change(txt)
    }
  }

  return (
    <Form>
      <Form.Input
        fluid
        id='form-subcomponent-shorthand-input-first-name'
        placeholder={placeholder}
        onChange={inputChanged}
      />
    </Form>
  )
}

export default SearchBar
