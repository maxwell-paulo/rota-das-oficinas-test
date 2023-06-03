import { useState } from "react";

export function BillDivider() {
  // Estado para as pessoas
  const [people, setPeople] = useState([]);
  // Estado para o nome da pessoa
  const [name, setName] = useState("");
  // Estado para os itens
  const [items, setItems] = useState([]);
  // Estado para o nome do item
  const [itemName, setItemName] = useState("");
  // Estado para o preço do item
  const [itemPrice, setItemPrice] = useState("");
  // Estado para os consumidores do item
  const [itemConsumers, setItemConsumers] = useState([]);
  // Estado para a taxa de serviço de cada pessoa
  const [serviceCharge, setServiceCharge] = useState({});

  // Função para lidar com a mudança de nome da pessoa
  function handlePersonChange(event) {
    setName(event.target.value);
  }

  // Função para adicionar uma pessoa
  function handleAddPerson(event) {
    event.preventDefault();

    if (name) {
      setPeople([...people, name]);
      setName("");
    }
  }

  // Função para lidar com a mudança de nome do item
  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }

  // Função para lidar com a mudança de preço do item
  function handleItemPriceChange(event) {
    setItemPrice(event.target.value);
  }

  // Função para lidar com a seleção de uma pessoa como consumidor do item
  function handlePersonSelection(person) {
    if (itemConsumers.includes(person)) {
      setItemConsumers(itemConsumers.filter((p) => p !== person));
    } else {
      setItemConsumers([...itemConsumers, person]);
    }
  }

  // Função para lidar com a mudança da taxa de serviço de uma pessoa
  function handleServiceChargeChange(person, checked) {
    setServiceCharge((prevServiceCharge) => ({
      ...prevServiceCharge,
      [person]: checked,
    }));
  }

  // Função para adicionar um item
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

  // Função para calcular o preço total
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

  // Função para calcular o preço por pessoa
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
      {/* Adicionar uma pessoa */}
      <div>
        <input
          type="text"
          value={name}
          onChange={handlePersonChange}
          placeholder="Digite o nome da pessoa"
        />
        <button onClick={handleAddPerson}>Adicionar Pessoa</button>
      </div>
      {/* Adicionar um item */}
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
        {/* Selecionar pessoas para o item */}
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
      {/* Listar pessoas */}
      <div>
        <h2>Pessoas na Mesa</h2>
        {people.map((person, index) => (
          <p key={index}>{person}</p>
        ))}
      </div>
      {/* Listar itens */}
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
      {/* Calcular preço total e por pessoa */}
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
