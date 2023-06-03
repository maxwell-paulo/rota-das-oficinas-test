import React, { useState } from "react";
import style from "./style.module.css";

export function BillDivider() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemConsumers, setItemConsumers] = useState([]);
  const [serviceCharge, setServiceCharge] = useState({});

  const handlePersonChange = (event) => {
    setName(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (name) {
      setPeople([...people, name]);
      setName("");
    }
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };

  const handlePersonSelection = (person) => {
    if (itemConsumers.includes(person)) {
      setItemConsumers(itemConsumers.filter((p) => p !== person));
    } else {
      setItemConsumers([...itemConsumers, person]);
    }
  };

  const handleServiceChargeChange = (person, checked) => {
    setServiceCharge((prevServiceCharge) => ({
      ...prevServiceCharge,
      [person]: checked,
    }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    if (itemName && itemPrice && itemConsumers.length > 0) {
      const newItem = {
        name: itemName,
        price: Number(itemPrice),
        consumers: [...itemConsumers],
      };

      setItems([...items, newItem]);
      setItemName("");
      setItemPrice("");
      setItemConsumers([]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    items.forEach((item) => {
      const pricePerConsumer = item.price / item.consumers.length;
      item.consumers.forEach((consumer) => {
        const personIndex = people.indexOf(consumer);
        if (personIndex !== -1) {
          const personPrice = serviceCharge[consumer]
            ? pricePerConsumer * 1.1
            : pricePerConsumer;
          totalPrice += personPrice;
        }
      });
    });

    return totalPrice.toFixed(2);
  };

  const calculatePersonPrice = (person) => {
    let personPrice = 0;

    items.forEach((item) => {
      const pricePerConsumer = item.price / item.consumers.length;
      if (item.consumers.includes(person)) {
        personPrice += serviceCharge[person]
          ? pricePerConsumer * 1.1
          : pricePerConsumer;
      }
    });

    return personPrice.toFixed(2);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Divisor de Conta</h1>

      <div className={style.formContainer}>
      <h2>Adicionar pessoa</h2>
      <div className={style.formField}>
        <input
          type="text"
          value={name}
          onChange={handlePersonChange}
          placeholder="Digite o nome"
        />
        <button onClick={handleAddPerson} className={style.button}>Add</button>
        </div>
        </div>


      <div className={style.formContainer}>
      <h2>Adicionar Item</h2>
      <div className={style.formField}>
        <input
          type="text"
          value={itemName}
          onChange={handleItemNameChange}
          placeholder="Digite o nome"
        />
        <input
          type="number"
          value={itemPrice}
          onChange={handleItemPriceChange}
          placeholder="Digite o preço"
        />
        </div>
        </div>

        <div className={style.formContainer}>
          <h2>Quem consumiu {itemName}</h2>
          <div className={style.formField}>
          {people.map((person, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={itemConsumers.includes(person)}
                  onChange={() => handlePersonSelection(person)}
                />
                {person}
              </label>

            </div>
          ))}
          </div>
          <button onClick={handleAddItem} className={style.button}>Adicionar Item</button>
        </div>

      <div className={style.formContainer}>
        <h2>Total a Pagar</h2>
        <div className={style.finalPaymentField}>
        {people.map((person, index) => (
          <div className={index % 2 === 0 ? style.oddField : style.evenField}>
          <p key={index}>
            {person}: <span>R${calculatePersonPrice(person)}</span>
          </p>
          <label>
                10%:
                <input
                  type="checkbox"
                  checked={serviceCharge[person] || false}
                  onChange={(e) =>
                    handleServiceChargeChange(person, e.target.checked)
                  }
                />
              </label>
              </div>
        ))}
        </div>
        <p>Total: <span>R${calculateTotalPrice()}</span></p>
      </div>

      <div className={style.formContainer}>
        <h2>Itens Consumidos</h2>
        <div className={style.finalPaymentField}>
        {items.map((item, index) => (
          <div key={index} className={index % 2 === 0 ? style.oddField : style.evenField}>
            <p>{item.name} - Preço: R${item.price}</p>
            <p>Consumido por: {item.consumers.join(", ")}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
