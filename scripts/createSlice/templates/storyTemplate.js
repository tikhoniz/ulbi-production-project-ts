module.exports = (layer, componentName) =>
  `// ${componentName}.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
  title: '${layer}/${componentName}'
}

export default meta
type Story = StoryObj<typeof ${componentName}>

export const Normal: Story = {
  args: {}
}
`
