import * as React from "react";
import ReactTree from 'react-d3-tree';

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

const Tree = () => {
    return (
        <div className=" bg-white h-full">
            <ReactTree data={orgChart} orientation="vertical" />
        </div>
    )
}

export default Tree;
