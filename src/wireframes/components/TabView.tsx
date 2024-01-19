import * as React from "react";
import { getDiagram, useStore } from "@app/wireframes/model";
import { AnimationMenu, PropertiesMenu } from "./menu";
import './styles/TabView.scss';

export const TabView = () => {
    const diagram = useStore(getDiagram);
    const selectedTab = useStore(s => s.ui.selectedTab);

    if (!diagram) {
        return null;
    }

    return (
        (selectedTab == 'design') ? <PropertiesMenu /> :
        (selectedTab == 'animation') ? <AnimationMenu diagram={ diagram } />
        : <></>
    );
};

