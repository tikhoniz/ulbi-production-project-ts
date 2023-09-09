import { getCounter } from './getCounter'

describe('getCounter', () => {
  // проверяем, что из стейта нам возвращается та часть стейта которая нужна, в данном случае значение счетчика
  test('should return counter value', () => {
    const state = {
      counter: { value: 10 }
    }
    expect(getCounter(state)).toEqual({ value: 10 })
  })
})
