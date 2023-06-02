
import { useState } from "react"
import {romanToArab, arabToRoman, isValidArab, isValidRoman} from "roman-numbers"

export function RomanNumbers() {
  const [inputValue, setInputValue] = useState("") // Estado para armazenar o valor de entrada
  const [result, setResult] = useState("") // Estado para armazenar o resultado da conversão

  // Função para lidar com a alteração do valor de entrada
  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  // Função para converter de arábico para romano
  function handleArabicToRoman() {

    // Verifica se o valor de entrada é um número arábico válido
    if(!isValidArab(parseInt(inputValue))) {
      setResult("Digite um número inteiro entre 1 e 3999")
    } else {
      setResult(arabToRoman(parseInt(inputValue))); // Converte o número arábico para romano
    }
  }

  // Função para converter de romano para arábico
  function handleRomanToArabic() {

    // Verifica se o valor de entrada é um número romano válido
    if(!isValidRoman(inputValue.toUpperCase())) {
      setResult("Digite um número romano válido")
    } else {
      setResult(romanToArab(inputValue.toUpperCase())) // Converte o número romano para arábico

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
