/* eslint-disable i18next/no-literal-string */
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'shared/ui/Button/Button'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { counterActions } from '../model/slice/counterSlice'

export const Counter = (): JSX.Element => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)

  const increment = (): void => {
    dispatch(counterActions.increment())
  }
  const decrement = (): void => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button
        onClick={increment}
        data-testid='increment-btn'
      >
        increment
      </Button>
      <Button
        onClick={decrement}
        data-testid='decrement-btn'
      >
        decrement
      </Button>
    </div>
  )
}
