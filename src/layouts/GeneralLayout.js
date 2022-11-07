import React from "react";
import { Layout } from "antd";

export default function GeneralLayout(props){
    const { children } = props;
    return (
        <Layout>
            <h2>Menu</h2>
            <div>Contenido</div>
            <h5>Footer</h5>
            {children}
        </Layout>
    );
};