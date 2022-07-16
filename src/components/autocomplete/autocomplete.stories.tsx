import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Autocomplete from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Components/Autocomplete',
    component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args) => <Autocomplete
    {...args}>
</Autocomplete>;

export const Open = Template.bind({});
Open.args = {
    type: "member"
}
