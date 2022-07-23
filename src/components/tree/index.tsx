import * as React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { ITreeNode } from "./definitions";
import FamilyTree from '@balkangraph/familytree.js';

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

interface ITreeProps
{
    // data?: ITreeNode
    nodes: any[]
}

const Tree = (props: ITreeProps) => {
    const divRef = useRef(null);
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        loadTree();
        setLoad(l => l = false);
    }, [divRef]);

    useEffect(() => {
        if(!(load && props.nodes)) return;
        loadTree();
        setLoad(l => l = false);
    }, [load]);

    useEffect(() => {
        if(props.nodes)
            setLoad(l => l = true);
    }, [props.nodes]);

    const loadTree = useCallback(() => {
        if(!(divRef && divRef.current)) return;
        const f = new FamilyTree(divRef.current , {
            nodes: props.nodes,
            enableSearch: false,
            mode: "dark",
            nodeBinding: {
                field_0: "name"
            }
        });
    }, [divRef]);

    return (
        <div className=" bg-white h-full" id="tree" ref={divRef}>
            {/* <ReactTree data={props.data || base} orientation="vertical" /> */}
            {/* <div></div> */}
        </div>
    )
}

export default Tree;
