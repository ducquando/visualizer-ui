import { Button, Tabs } from "antd";
import * as React from "react";
import { Diagram, getDiagram, selectTab, toggleRightSidebar, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";
import { texts } from "@app/texts";
import { AppstoreOutlined, CloseOutlined, ControlOutlined, ProfileOutlined } from "@ant-design/icons";
import { Properties } from "../properties/Properties";
import { Pages } from "../pages/Pages";
import { Outline } from "../outline/Outline";
import { useEventCallback } from "@app/core";

export interface TabViewProps {
    collapse: boolean;
}

export const TabView = (props: TabViewProps) => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <TabViewInner {...props} diagram={diagram} />
    );
};

export const TabViewInner = ({ diagram, collapse }: TabViewProps & { diagram: Diagram }) => {
    const dispatch = useDispatch();
    const selectedTab = useStore(s => s.ui.selectedTab);

    const doSelectTab = useEventCallback((key: string) => {
        dispatch(selectTab(key));
        if (collapse) {
            doToggleRightSidebar();
        }
    });
    const doToggleRightSidebar = useEventCallback(() => {
        dispatch(toggleRightSidebar());
    });

    const closeSideBar = <Button onClick={doToggleRightSidebar}
        icon={<CloseOutlined />}
        type='text'
        size='small'
        shape='circle' />

    return (
        <Tabs type='card' onTabClick={doSelectTab} activeKey={selectedTab}
            tabPosition={!collapse ? 'top' : 'left'}
            tabBarExtraContent={!collapse ? closeSideBar : <></>} >
            <Tabs.TabPane
                key='properties'
                tab={!collapse ? texts.common.properties : <ControlOutlined />} >
                <Properties />
            </Tabs.TabPane>

            <Tabs.TabPane key='pages'
                tab={!collapse ? texts.common.pages : <AppstoreOutlined />} >
                <Pages />
            </Tabs.TabPane>
            
            <Tabs.TabPane key='outline'
                tab={!collapse ? texts.common.outline : <ProfileOutlined />} >
                <Outline />
            </Tabs.TabPane>
        </Tabs>
    );
};

