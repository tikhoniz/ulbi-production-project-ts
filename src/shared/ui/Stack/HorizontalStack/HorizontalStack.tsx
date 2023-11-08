import { Flex, type FlexProps } from '../Flex/Flex'

// позволяет исключить какое-либо поле из другого типа
// в данном случае исключаем свойство 'direction'
type HStackProps = Omit<FlexProps, 'direction'>

export const HorizontalStack = (props: HStackProps) => {
  return <Flex {...props} direction='row' />
}
