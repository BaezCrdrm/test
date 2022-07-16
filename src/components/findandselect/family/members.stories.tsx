import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FindAndSelectFamily from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Views/FindAndSelect/Family',
    component: FindAndSelectFamily,
} as ComponentMeta<typeof FindAndSelectFamily>;

const Template: ComponentStory<typeof FindAndSelectFamily> = (args) => <FindAndSelectFamily
    {...args}>
    <div>
    </div>
</FindAndSelectFamily>;

export const Default = Template.bind({});
Default.args = {
    open: true
}
