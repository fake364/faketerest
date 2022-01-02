import React from "react";
import Header from "../header/Header";
import NavigationContainer from "../header/navigation/base-container/NavigationContainer";
import BaseHead from "../head/BaseHead";

type Props = {};

const Layout: React.FC<Props> = ({children}) => {
    return <>
        <BaseHead></BaseHead>
        <Header><NavigationContainer></NavigationContainer></Header>
        <main>{children}</main>
    </>
};

export default Layout;