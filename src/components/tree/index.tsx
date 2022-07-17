import * as React from "react";
import ReactTree from 'react-d3-tree';
import { ITreeNode } from "./definitions";

const orgChart = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                son: 'Production',
            },
            children: [
                {
                name: 'Foreman',
                attributes: {
                    son: 'Fabrication',
                },
                children: [
                    {
                    name: 'Worker',
                    },
                ],
                },
                {
                name: 'Foreman',
                attributes: {
                    son: 'Assembly',
                },
                children: [
                    {
                    name: 'Worker',
                    },
                ],
                },
            ],
        },
    ],
};

const base: ITreeNode = {
    name: 'Origin',
    children: []
};

interface ITreeProps
{
    data?: ITreeNode
}

const Tree = (props: ITreeProps) => {
    return (
        <div className=" bg-white h-full">
            <ReactTree data={props.data || base} orientation="vertical" />
        </div>
    )
}

export default Tree;
