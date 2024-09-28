import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../../src/app'; // Assumindo que você tenha exportado o app no arquivo app.ts
import { createConnection } from 'typeorm';

// Configuração para rodar os testes
beforeAll(async () => {
  await createConnection();
  await getConnection().runMigrations(); // Executa as migrações
});

afterEach(async () => {
  const connection = getConnection();
  await connection.query(`DELETE FROM users`); // Limpa a tabela de usuários
});

describe('User Creation', () => {
  it('should create a user with valid data and return a JWT token', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '123456',
      cpf: '12345678901',
      phone: '1234567890',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('name', 'Test User');
  });

  it('should return error when email already exists', async () => {
    await request(app).post('/users').send({
      name: 'Test User',
      email: 'duplicate@example.com',
      password: '123456',
      cpf: '12345678902',
      phone: '1234567890',
    });

    const response = await request(app).post('/users').send({
      name: 'Another User',
      email: 'duplicate@example.com',
      password: '654321',
      cpf: '98765432101',
      phone: '0987654321',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User already exists');
  });
});
