import { Flex, type FlexProps } from '../Flex/Flex'

// позволяет исключить какое-либо поле из другого типа
// в данном случае исключаем свойство 'direction'
type VStackProps = Omit<FlexProps, 'direction'>

export const VerticalStack = (props: VStackProps) => {
  const { align = 'start' } = props
  return <Flex {...props} direction='column' align={align} />
}
