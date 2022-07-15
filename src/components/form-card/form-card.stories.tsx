import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Views/FormCard',
    component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card 
    {...args}>
    <form>

    </form>
</Card>;

export const Primary = Template.bind({});
Primary.args = {
    title: "Hoooola"
}

export const Width = Template.bind({});
Width.args = {
    title: "Hello world",
    width: 100
}

export const Buttons = Template.bind({});
Buttons.args = {
    title: "Hello world",
    events: {
        accept: {
            event: () => alert("Accept")
        },
        close: {
            event: () => alert("Close")
        }
    }
}
