import React from 'react'
import { Select } from 'semantic-ui-react'

type TDropDownOptions = { key: string, value: string, text: string }

const values = [
  "All",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

const makeOptions = (): TDropDownOptions[] => {
  return values.map(v => {
    return { key: v, value: v, text: v }
  })
}

const SelectActor = () => (
  <Select placeholder="select..." options={makeOptions()} />
)

export default SelectActor
