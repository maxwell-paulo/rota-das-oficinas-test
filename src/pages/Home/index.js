import style from "./style.module.css";

export function Home() {

  return (
    <div className={style.container}>
    <h1>Teste de Programação - Rota das Oficinas</h1>
    <p>Nesse site apresento a minha solução para as 3 tarefas do Teste de Programação da Rota das Oficinas.</p>
    <p>Clique na tarefa que gostaria de acessar</p>

    <ul className={style.taskList}>
      <li>
        <a href="/numeros-romanos">Tarefa 1. Conversor de números romanos</a>
      </li>
      <li>
        <a href="/jogo-da-vida">Tarefa 2. Jogo da vida</a>
      </li>
      <li>
        <a href="/conta">Tarefa 3. Divisor de conta de restaurante</a>
      </li>
    </ul>

    <p>Para ver o código <a href="https://github.com/maxwell-paulo/rota-das-oficinas-test" target="_blank"
        rel="noreferrer">clique aqui</a></p>
  </div>
  )

}
