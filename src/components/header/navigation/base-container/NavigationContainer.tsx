import React from "react";
import styles from './NavigationContainer.module.scss';

type Props = {};

const NavigationContainer: React.FC<Props> = ({children}) => {
    return <nav className={styles.mainNavigationContainer}>{children}</nav>
};

export default NavigationContainer;