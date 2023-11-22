import { Button, Tabs } from "antd";
import * as React from "react";
import { useEventCallback } from '@app/core';
import { Diagram, getDiagram, selectPanel, togglePanel, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { texts } from "@app/texts";
import { AnimationView } from "../animation/AnimationView";
import { ErrorView } from "../animation/ErrorView";

export interface PanelViewProps {
}

export const PanelView = (props: PanelViewProps) => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <PanelViewInner {...props} diagram={diagram} />
    );
};

export const PanelViewInner = ({ diagram }: PanelViewProps & { diagram: Diagram }) => {
    const dispatch = useDispatch();
    const selectedPanel = useStore(s => s.ui.selectedPanel);
    const showPanel = useStore(s => s.ui.showPanel);
    
    const doSelectPanel = useEventCallback((key: string) => {
        dispatch(selectPanel(key));
        if (!showPanel) {
            doTogglePanel();
        }
    });
    const doTogglePanel = useEventCallback(() => {
        dispatch(togglePanel());
    });
    
    const closePanel = <Button onClick={doTogglePanel}
        icon={showPanel ? <CloseOutlined /> : <></>}
        type='text'
        size='small'
        shape='circle' />

    return (
        <Tabs tabBarExtraContent={closePanel} className="animation-view" type='card' onTabClick={doSelectPanel} activeKey={selectedPanel}>
            <Tabs.TabPane key='animation' tab={texts.common.animation}>
                { showPanel ? <AnimationView diagram={ diagram } /> : <></> }
            </Tabs.TabPane>
            <Tabs.TabPane key='error' tab={texts.common.error}>
                { showPanel ? <ErrorView /> : <></> }
            </Tabs.TabPane>
        </Tabs>
    );
};