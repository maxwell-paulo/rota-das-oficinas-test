
import { useState } from "react"
import {romanToArab, arabToRoman, isValidArab, isValidRoman} from "roman-numbers"
import style from "./style.module.css";

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

    <div className={style.container}>
    <h1 className={style.title}>CONVERSOR DE NÚMEROS ROMANOS</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} className={style.input} placeholder="Digite aqui o número"/>
    <div className={style.buttonsContainer}>
    <button onClick={handleArabicToRoman} className={style.button}>Converter para Romano</button>
    <button onClick={handleRomanToArabic} className={style.button}>Converter para Arábico</button>
    </div>
    <div className={style.result}> {result}</div>
  </div>

  )
}
