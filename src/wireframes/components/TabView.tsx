import * as React from "react";
import { getDiagram, useStore } from "@app/wireframes/model";
import { AnimationMenu, PropertiesMenu } from "./menu";
import './styles/TabView.scss';

export const TabView = () => {
    const diagram = useStore(getDiagram);
    const applicationMode = useStore(s => s.ui.selectedApplicationMode);

    if (!diagram) {
        return null;
    }

    return (
        (applicationMode == 'design') ? <PropertiesMenu /> :
        (applicationMode == 'animation') ? <AnimationMenu diagram={ diagram } />
        : <></>
    );
};

