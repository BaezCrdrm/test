import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tree from '.';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Components/Tree',
    component: Tree,
} as ComponentMeta<typeof Tree>;

const Template: ComponentStory<typeof Tree> = (args) => <Tree {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    nodes: [
        { id: 1, pids: [2], name: "Amber McKenzie"},
        { id: 2, pids: [1], name: "Ava Field"},
        { id: 3, mid: 1, fid: 2, pids: [6], name: "Peter Stevens"},
        { id: 4, mid: 1, fid: 2, name: "Savin Stevens"},
        { id: 5, mid: 1, fid: 2, name: "Emma Stevens" },
        { id: 6, pids: [3], name: "Dany" },
        // { id: 7, mid: 1, fid: 2, name: "Emma Stevens" }
    ]
}

export const ApiData = Template.bind({});
ApiData.args = {
    nodes: [
        {"id":"13206be3-a2a5-43da-a373-ec02423da863","name":"Samuel"},
        {"id":"4041a99b-c553-4144-859b-763b64b71955","name":"Lucino"},
        {"id":"71a5683e-be1c-4e89-8185-aba885efa328","name":"Ernestina"}
    ]
}

export const TransformedData = Template.bind({});
TransformedData.args = {
    nodes: [
        {"id":"13206be3-a2a5-43da-a373-ec02423da863","name":"Samuel","fid":"4041a99b-c553-4144-859b-763b64b71955","mid":"71a5683e-be1c-4e89-8185-aba885efa328"},
        {"id":"4041a99b-c553-4144-859b-763b64b71955",pids:["71a5683e-be1c-4e89-8185-aba885efa328"],"name":"Lucino"},
        {"id":"71a5683e-be1c-4e89-8185-aba885efa328",pids:["4041a99b-c553-4144-859b-763b64b71955"],"name":"Ernestina"}
    ]
}

export const FullTransformedData = Template.bind({});
FullTransformedData.args = {
    nodes: [
        {"id":"13206be3-a2a5-43da-a373-ec02423da863","name":"Samuel","fid":"4041a99b-c553-4144-859b-763b64b71955","mid":"71a5683e-be1c-4e89-8185-aba885efa328"},
        {"id":"4041a99b-c553-4144-859b-763b64b71955","name":"Lucino","pids":["71a5683e-be1c-4e89-8185-aba885efa328"]},
        {"id":"71a5683e-be1c-4e89-8185-aba885efa328","name":"Ernestina","pids":["4041a99b-c553-4144-859b-763b64b71955"]},
        {"id":"71a5683e-be1c-4e89-8185-aba885efa329","fid": "13206be3-a2a5-43da-a373-ec02423da863","name":"Cha"}
    ]
}
