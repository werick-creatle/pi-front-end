import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (requisicao, proximo) => {
  console.log('--- 1. Interceptor iniciado ---'); // Espião 1

  const usuarioLogado = localStorage.getItem('usuario_logado');
  console.log('--- 2. Conteúdo do localStorage:', usuarioLogado); // Espião 2

  if (usuarioLogado) {
    try {
      const dados = JSON.parse(usuarioLogado);
      const token = dados.token;
      
      console.log('--- 3. Token encontrado:', token); // Espião 3

      if (token) {
        const requisicaoClonada = requisicao.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('--- 4. Token anexado com sucesso! Enviando... ---'); // Espião 4
        return proximo(requisicaoClonada);
      }
    } catch (e) {
      console.error('--- ERRO AO LER JSON DO USUARIO ---', e);
    }
  } else {
    console.warn('--- AVISO: Nenhum usuário logado encontrado no navegador ---');
  }

  return proximo(requisicao);
};