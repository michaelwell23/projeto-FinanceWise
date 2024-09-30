// tests/user/GetOneUser.test.ts
import request from 'supertest';
import { getConnection, createConnection } from 'typeorm';
import app from '../../src/app'; // Importa o app
import { generateValidTokenForTesting } from '../utils/generateToken'; // Gera token JWT válido

beforeAll(async () => {
  await createConnection();
  await getConnection().runMigrations(); // Executa as migrações
});

afterEach(async () => {
  const connection = getConnection();
  await connection.query(`DELETE FROM users`); // Limpa a tabela de usuários
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close(); // Fecha a conexão após os testes
});

describe('Get One User', () => {
  it('should return a user when a valid ID is provided', async () => {
    const token = generateValidTokenForTesting(); // Gera o token JWT

    const mockUser = {
      id: 'valid-uuid',
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      avatar: 'avatar.jpg',
    };

    // Inserir o mockUser no banco de dados para o teste

    const response = await request(app)
      .get(`/users/${mockUser.id}`)
      .set('Authorization', `Bearer ${token}`) // Adiciona o token no cabeçalho
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
  });

  it('should return 404 if the user is not found', async () => {
    const token = generateValidTokenForTesting(); // Gera o token JWT

    const response = await request(app)
      .get('/users/non-existent-uuid')
      .set('Authorization', `Bearer ${token}`) // Adiciona o token no cabeçalho
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Usuário não encontrado' });
  });

  it('should return 400 for invalid UUID format', async () => {
    const token = generateValidTokenForTesting(); // Gera o token JWT

    const response = await request(app)
      .get('/users/invalid-uuid')
      .set('Authorization', `Bearer ${token}`) // Adiciona o token no cabeçalho
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
