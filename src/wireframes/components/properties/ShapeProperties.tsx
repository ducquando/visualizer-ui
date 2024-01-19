/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { Col, Input, Row } from 'antd';
import * as React from 'react';
// import { useDispatch } from 'react-redux';
// import { useEventCallback } from '@app/core';
import { texts } from '@app/texts';
import { getSelectedItems, useStore } from '@app/wireframes/model';
// import { useState } from 'react';

export const ShapeProperties = React.memo(() => {
    // const dispatch = useDispatch();
    const selectedItems = useStore(getSelectedItems);
    const isSingleItem = selectedItems.length == 1;
    const selectedItem = selectedItems.at(0);

    if (!isSingleItem || !selectedItem) {
        return <></>;
    } 

    // const [selectedID] = useState(selectedItem.id);

    // const doChangeID = useEventCallback(() => {
    //     dispatch(selectedItem.resetID(selectedID));
    // });

    return (
        <>
            <Row className='property'>
                <Col span={4} className='property-label'>{texts.common.id}</Col>
                <Col span={20} className='property-value'>
                    <Input 
                        value={selectedItem.id} 
                        // onChange={(e) => !e ? null : setSelectedID(e.target.value)} 
                    />
                </Col>
            </Row>
        </>
    );
});
