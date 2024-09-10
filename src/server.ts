// Importa a aplicação express configurada a partir do arquivo 'app.js'
import app from './app';

// Define a porta do servidor. Utiliza a variável de ambiente PORT se estiver definida, 
// caso contrário, usa a porta padrão 4000.
const PORT = process.env.PORT || 4000;

// Inicia o servidor na porta definida e exibe uma mensagem no console indicando que o servidor está rodando.
// A função de callback é executada quando o servidor começa a escutar a porta.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
