import * as React from 'react';
import { useState, useEffect } from 'react';
import MaterialCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { CallbackFunction } from '../utils/definitions';
import { Typography } from '@mui/material';

interface IFormCardProps
{
    children: JSX.Element,
    title: string,
    width?: number | string,
    onAccept?: CallbackFunction,
    onCancel?: CallbackFunction,
    onClose?: CallbackFunction
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
    const close = () => {
        if(props.onClose)
            props.onClose();
    }

    return (
        <div className="w-full h-full sm:h-auto">
            <div className="bg-blue-500 h-full sm:h-auto sm:pr-2 sm:pt-2 relative rounded-md">
                <div className="absolute right-0 top-0 mr-2 mt-2">
                    <button className="bg-gray-400 text-white opacity-80 rounded-full"
                        onClick={close}>
                        <CloseIcon />
                    </button>
                </div>

                <CardContent>
                    <div>
                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>
                        {props.children}
                    </div>
                </CardContent>

                <CardActions>
                    { getActionButton(props.onAccept !== undefined, "Accept", props.onAccept) }
                    { getActionButton(props.onCancel !== undefined, "Cancel", props.onCancel) }
                </CardActions>
            </div>
        </div>
    );
}

export default Card;
