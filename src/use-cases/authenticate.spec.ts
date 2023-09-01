import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Cases', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  // deve ser capaz de autenticar
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  // não deve ser possível autenticar com e-mail errado
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  // não deve ser possível autenticar com senha errada
  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
