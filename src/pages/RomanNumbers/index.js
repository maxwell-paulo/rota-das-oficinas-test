
import { useState } from "react"
import {romanToArab, arabToRoman, isValidArab, isValidRoman} from "roman-numbers"

export function RomanNumbers() {
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function handleArabicToRoman() {

    if(!isValidArab(parseInt(inputValue))) {
      setResult("Digite um número inteiro entre 1 e 3999")
    } else {
      setResult(arabToRoman(parseInt(inputValue)));
    }
  }

  function handleRomanToArabic() {

    if(!isValidRoman(inputValue.toUpperCase())) {
      setResult("Digite um número romano válido")
    } else {
      setResult(romanToArab(inputValue.toUpperCase()))

    }
  }


  return (

    <div>
    <h2>Conversor de números romanos e arábicos</h2>
    <label>
      Número:
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </label>
    <button onClick={handleArabicToRoman}>Converter para Romano</button>
    <button onClick={handleRomanToArabic}>Converter para Arábico</button>
    <div>Resultado: {result}</div>
  </div>

  )
}
