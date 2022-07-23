import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FamilyNode from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Components/FamilyNode',
    component: FamilyNode,
} as ComponentMeta<typeof FamilyNode>;

const Template: ComponentStory<typeof FamilyNode> = (args) => <FamilyNode {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
    
// }
