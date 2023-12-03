import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TestFeatures } from './TestFeatures';

export default {
    title: 'features/TestFeatures',
    component: TestFeatures,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TestFeatures>;

const Template: ComponentStory<typeof TestFeatures> = (args) => <TestFeatures {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};