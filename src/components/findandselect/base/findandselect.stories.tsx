import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FindAndSelect from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Views/FindAndSelect',
    component: FindAndSelect,
} as ComponentMeta<typeof FindAndSelect>;

const Template: ComponentStory<typeof FindAndSelect> = (args) => <FindAndSelect
    {...args}>
    <div>
    </div>
</FindAndSelect>;

export const Default = Template.bind({});
Default.args = {
    title: "Hello world",
    open: true,
    type: "member"
}
