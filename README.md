<body>
  <h1>Termuix</h1>
  <p>Essa biblioteca é tipo um kit ninja pra criar interfaces gráficas estilo jogo direto no terminal, sem frescura. Perfeita pra tu que quer botar umas paradas dinâmicas, estáticas e interagir fácil com o usuário via teclado.</p>

  <section>
    <h2>Funcionalidades principais</h2>
    <ul>
      <li><code>DrawUI</code>: controla o mapa, largura, altura e grupos estáticos e dinâmicos.</li>
      <li><code>StaticComponent</code>: para objetos fixos que não se movem, tipo parede, chão, cenário.</li>
      <li><code>DynamicComponent</code>: para objetos móveis, tipo personagens, inimigos, itens.</li>
      <li><code>InputHandler</code>: captura input do teclado de forma simples, em modo raw.</li>
      <li><code>createBorder(symbol)</code>: cria uma borda no mapa pra delimitar o espaço de jogo.</li>
      <li><code>moveWithCollision(dx, dy)</code>: movimenta o objeto dinâmico só se não colidir com algo.</li>
      <li><code>saveState() / loadState()</code>: salvar e carregar o estado atual do mapa.</li>
      <li><code>render()</code>: desenha o mapa no terminal limpando tudo e atualizando o display.</li>
    </ul>
  </section>

  <section>
    <h2>Como usar na real?</h2>
    <p>Basta criar um <code>DrawUI</code>, criar os grupos estáticos e dinâmicos, configurar objetos e depois chamar o <code>render()</code> dentro de um loop que responde ao input do usuário.</p>
    <p>Exemplo rápido:</p>
   ![image](https://github.com/user-attachments/assets/50758177-114f-48aa-af03-275955b6e081)

  </section>

  <section>
    <h2>Por que usar?</h2>
    <p>Porque é simples, leve e direta ao ponto. Sem frescura, só o básico pra tu montar games no terminal, testar ideias rápidas, ou fazer projetos de programação que mostrem domínio de lógica, OOP e interação.</p>
  </section>

  <footer>
    Feito por Nicolas Asafe &nbsp;&middot;&nbsp; 2025
  </footer>
</body>
