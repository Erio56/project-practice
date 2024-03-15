import request from 'supertest'
import app from './index.ts'
// import SecretController from './controller.ts'
import { describe, test, expect } from '@jest/globals'

// const controller =  new SecretController

describe('POST /api/secrets', () => {
  test('It should with status 200', async () => {
    const response = await request(app).get('/api/secrets/efed2c89e88343e23202bde3f1538d6db8b2fc9f')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toEqual({ message: 'Not Found' })
  })
})

describe('GET /api/secrets', () => {
  let respondeId: string
  test('It should respond with status 200', async () => {
    const response = await request(app).post('/api/secrets').send({ message: 'prueba3' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('secretKey')
    respondeId = response.body.secretKey
  })
  test('It should respond with the secret message', async () => {
    const response = await request(app).get(`/api/secrets/${respondeId}`)
    expect(typeof response.body.message).toBe('string')
    expect(response.body.message).toBeTruthy()
  })
})
