import { useState } from "react";

export function BillDivider() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemConsumers, setItemConsumers] = useState([]);
  const [serviceCharge, setServiceCharge] = useState({});

  function handlePersonChange(event) {
    setName(event.target.value);
  }

  function handleAddPerson(event) {
    event.preventDefault();

    if (name) {
      setPeople([...people, name]);
      setName("");
    }
  }

  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }

  function handleItemPriceChange(event) {
    setItemPrice(event.target.value);
  }

  function handlePersonSelection(person) {
    if (itemConsumers.includes(person)) {
      setItemConsumers(itemConsumers.filter((p) => p !== person));
    } else {
      setItemConsumers([...itemConsumers, person]);
    }
  }

  function handleServiceChargeChange(person, checked) {
    setServiceCharge((prevServiceCharge) => ({
      ...prevServiceCharge,
      [person]: checked,
    }));
  }

  function handleAddItem(event) {
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
  }

  function calculateTotalPrice() {
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
  }

  function calculatePersonPrice(person) {
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
  }

  return (
    <div>
      <h1>Aplicação de Mesas</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={handlePersonChange}
          placeholder="Digite o nome da pessoa"
        />
        <button onClick={handleAddPerson}>Adicionar Pessoa</button>
      </div>
      <div>
        <input
          type="text"
          value={itemName}
          onChange={handleItemNameChange}
          placeholder="Digite o nome do item"
        />
        <input
          type="number"
          value={itemPrice}
          onChange={handleItemPriceChange}
          placeholder="Digite o preço do item"
        />
        <div>
          <h3>Pessoas na Mesa</h3>
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
              <label>
                Taxa de Serviço:
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
        <button onClick={handleAddItem}>Adicionar Item</button>
      </div>
      <div>
        <h2>Pessoas na Mesa</h2>
        {people.map((person, index) => (
          <p key={index}>{person}</p>
        ))}
      </div>
      <div>
        <h2>Itens Consumidos</h2>
        {items.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - Preço: R${item.price}
            </p>
            <p>
              Consumido por: {item.consumers.join(", ")}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Total a Pagar</h2>
        <p>Total: R${calculateTotalPrice()}</p>
        {people.map((person, index) => (
          <p key={index}>
            {person}: R${calculatePersonPrice(person)}
          </p>
        ))}
      </div>
    </div>
  );
}
