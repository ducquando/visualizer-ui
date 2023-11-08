/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { getDiagramId, useStore,addShape } from '@app/wireframes/model';
import * as React from 'react';

export const ShapeMenu = React.memo(() => {
    const dispatch = useDispatch();
    const selectedDiagramId = useStore(getDiagramId);

    const createNewShape = (renderer: string) => {
        if (selectedDiagramId) {
            dispatch(addShape(selectedDiagramId, renderer, { position: { x: 10, y: 10 } }));
        }
    };

    const TextIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M432-192v-480H240v-96h480v96H528v480h-96Z"/></svg>
    );
    const FunctionIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M384-240v-72h70l99-120-99-120h-55l-64 322q-8 39-35.5 62.5T237-144q-39 0-66-26.5T144-232q0-24 14-40t36-16q20 0 33 12.5t13 31.5q0 6-1.5 13t-4.5 14q2 1 3 1h3q10 0 15.5-7t8.5-21l62-308h-86v-72h100l21-106q8-39 35.5-62.5T459-816q39 0 66 26.5t27 61.5q0 24-14 40t-36 16q-20 0-33-12.5T456-716q0-6 1.5-13t4.5-14q-2-1-3-1h-3q-10 0-15.5 7t-8.5 21l-19 92h163v72h-29l53 64 53-64h-29v-72h192v72h-69L647-432l100 120h69v72H624v-72h29l-53-64-53 64h29v72H384Z"/></svg>
    );
    const TableIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M144-144v-672h672v672H144Zm72-459h528v-141H216v141Zm200 194h128v-122H416v122Zm0 193h128v-121H416v121ZM216-409h128v-122H216v122Zm400 0h128v-122H616v122ZM216-216h128v-121H216v121Zm400 0h128v-121H616v121Z"/></svg>
    );
    const RectangleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M96-192v-576h768v576H96Zm72-72h624v-432H168v432Zm0 0v-432 432Z"/></svg>
    );
    const CircleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480.276-96Q401-96 331-126q-70-30-122.5-82.5T126-330.958q-30-69.959-30-149.5Q96-560 126-629.5t82.5-122Q261-804 330.958-834q69.959-30 149.5-30Q560-864 629.5-834t122 82.5Q804-699 834-629.276q30 69.725 30 149Q864-401 834-331q-30 70-82.5 122.5T629.276-126q-69.725 30-149 30ZM480-168q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
    );
    const TriangleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m96-192 384-576 384 576H96Zm134-72h500L480-638 230-264Zm250-187Z"/></svg>
    );
    const ImageIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm48-72h432L552-480 444-336l-72-96-108 144Zm-48 72v-528 528Z"/></svg>
    );

    return (
        <>
            <Tooltip mouseEnterDelay={1} title={ 'Textbox' }>
                <Button className='item' onClick={ () => createNewShape('Textbox') }>
                    <TextIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Latex' }>
                <Button className='item' onClick={ () => createNewShape('Equation') }>
                    <FunctionIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Table' }>
                <Button className='item' onClick={ () => createNewShape('Cell') }>
                    <TableIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Rectangle' }>
                <Button className='item' onClick={ () => createNewShape('Rectangle') }>
                    <RectangleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Ellipse' }>
                <Button className='item' onClick={ () => createNewShape('Ellipse') }>
                    <CircleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Triangle' }>
                <Button className='item' onClick={ () => createNewShape('Triangle') }>
                    <TriangleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Image' }>
                <Button className='item' onClick={ () => createNewShape('Image') }>
                    <ImageIcon />
                </Button>
            </Tooltip>
        </>
    );
});
