import * as React from "react";
import { getDiagram, useStore } from "@app/wireframes/model";
import { AnimationMenu } from "./menu";
import './styles/AnimationView.scss';

export const AnimationView = () => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <AnimationMenu diagram={ diagram } />
    );
};

