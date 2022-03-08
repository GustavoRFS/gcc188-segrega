/**
 * Nesse arquivo vem os tipos necessários para Users
 * Como o tipo do objeto que vai vim no body da requisição,
 * o tipo de saída da requisição, entre outros
 *
 * É diferente da model, pois a model é como os dados do usuário são salvos
 * no banco de dados, enquanto os tipos aqui são os específicos para entrada
 * e saída das rotas (podem ser iguais ao model ou não)
 */

import { User } from "./user.model";

export type GetUsersBody = {
  users: Array<User>;
};
