import * as React from 'react';
import { useState, useEffect } from 'react';
import MaterialCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { IEventProp } from '../utils/definitions';
import { Typography } from '@mui/material';

interface IFormCardProps
{
    children: JSX.Element,
    title: string,
    width?: number | string,
    events?: {
        accept?: IEventProp,
        cancel?: IEventProp,
        close?: IEventProp,
    }
}

const getActionButton = (condition: boolean, title: string, event?: (...args: any[]) => void) => {
    if(!condition) return <div></div>;

    if(!event)
        event = () => console.log(`${title} event is empty`);
    
    return (
        <Button size="small" onClick={event}>
            { title }
        </Button>
    );
}

const Card = (props: IFormCardProps): JSX.Element => {
    const [displayClose, setDisplayClose] = useState(true);

    useEffect(() => {
        const valClose = ((!props.events?.close) || (!props.events?.close?.avoid));
        setDisplayClose(valClose);
    }, []);

    const close = () => {
        if(props.events?.close?.event)
        {
            props.events.close?.event();
            return;
        }

        console.log("Card - Close");
    }

    return (
        <MaterialCard sx={{ 
            minWidth: 275, 
            maxWidth: 800,
            textAlign: "left",
            width: props.width ? props.width : "auto"
        }}>
            <CardContent>
                <div>
                    <Typography variant="h5" component="div">
                        {props.title}
                    </Typography>
                    {props.children}
                </div>
            </CardContent>

            <CardActions>
                { getActionButton(displayClose, "Close", close) }
                { getActionButton(props.events?.accept !== undefined, "Accept", props.events?.accept?.event) }
                { getActionButton(props.events?.cancel !== undefined, "Cancel", props.events?.cancel?.event) }
            </CardActions>
        </MaterialCard>
    );
}

export default Card;
