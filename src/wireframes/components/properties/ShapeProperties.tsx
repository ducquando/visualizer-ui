/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { Col, Input, Row } from 'antd';
import * as React from 'react';
import { texts } from '@app/texts';
import { getSelectedItems, useStore } from '@app/wireframes/model';

export const ShapeProperties = React.memo(() => {
    const [ selectedItem ] = useStore(getSelectedItems);

    if (!selectedItem) {
        return <></>;
    } 

    return (
        <>
            <Row className='property'>
                <Col span={4} className='property-label'>{texts.common.id}</Col>
                <Col span={20} className='property-value'>
                    <Input 
                        value={selectedItem.id} 
                    />
                </Col>
            </Row>
        </>
    );
});
