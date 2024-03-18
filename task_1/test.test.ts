import { Response, Request } from 'express'
/* eslint no-use-before-define: 0 */
import SecretController from './controller.ts'
import { describe, test, expect } from '@jest/globals'

const controller = new SecretController()

describe('POST /api/secrets', () => {
  test('It should create a new secret', () => {
    let responseObject = {}
    const request = {
      body: {
        message: 'prueba'
      }
    }
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result as { secretKey: string }
      })
    }

    const expectedSecret = {
      secretKey: ''
    }

    controller.createSecret(request as Request, response as Response)

    expect(typeof (responseObject as { secretKey: string }).secretKey).toEqual(typeof expectedSecret.secretKey)
  })
})

describe('GET /api/secrets/<key>', () => {
  test('It should return a secret', () => {
    let responseObject = {}
    const request = {
      params: {
        key: '97a6fca6412ce40fbc9f56d24debcba911507cfd'
      }
    }
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result as { message: string }
      })
    }

    const expectedSecret = {
      message: 'prueba'
    }

    controller.secrets = new Map<string, string>().set('97a6fca6412ce40fbc9f56d24debcba911507cfd', 'prueba')

    controller.getSecret(request as unknown as Request, response as Response)

    expect((responseObject as { message: string }).message).toEqual(expectedSecret.message)
  })
})
