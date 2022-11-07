import React from 'react';
import { useNotification } from '../../common/hooks/useNotification/useNotification';

type Props = {};

const GlobalNotificationWrapper: React.FC<Props> = ({children}) => {
	useNotification();

	return <>{children}</>;
};

export default GlobalNotificationWrapper;