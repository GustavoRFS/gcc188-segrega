//Centraliza as urls do front-end, que varia dependendo do ambiente em que o servidor está rodando

var urls;

switch (process.env.NODE_ENV) {
    case 'production': //No servidor de produção
        urls = {
            frontUrl: 'https://gamificacao.compjunior.com.br',
            backUrl: 'https://gamificacao.compjunior.com.br/api',
        };
        break;
    case 'development': //No servidor de testes
        urls = {
            frontUrl: 'https://gamificacao.compjunior.com.br',
            backUrl: 'https://gamificacao.compjunior.com.br/api',
        };
        break;
    default:
        //No computador local
        urls = {
            frontUrl: 'http://localhost:3000',
            backUrl: 'http://localhost:5000',
        };
        break;
}
export default urls;
