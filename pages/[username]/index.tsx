import React from 'react';
import Layout from '../../src/components/layout/Layout';
import Profile from '../../src/components/mains/authed/profile/Profile';
import RegistrationService from '../../src/common/backend/services/registrationService/RegistrationService';
import UserSubscriptionsService from '../../src/common/backend/services/userSubscriptionsService/UserSubscriptionsService';
import withSessionAuth from '../../src/common/backend/utils/withSessionAuth/withSessionAuth';
import UserDataEntity from '../../src/common/backend/validation-services/registration/UserDataEntity';
import { Nullable } from '../../src/common/types/common';

export type SubscriptionEntry = {
  id: number;
  firstName: string;
  lastName: Nullable<string>;
  username: string;
  actionMakerId: number;
};

export type ProfilePageProps = {
  userData: UserDataEntity;
  subscribers: SubscriptionEntry[];
  subscriptions: SubscriptionEntry[];
};

export default function UsernamePage({
  userData,
  subscribers,
  subscriptions
}: ProfilePageProps) {
  return (
    <Layout>
      <Profile
        userData={userData}
        subscribers={subscribers}
        subscriptions={subscriptions}
      />
    </Layout>
  );
}

export const getServerSideProps = withSessionAuth(
  async ({ params: { username }, req: { headers } }) => {
    const result = await RegistrationService.getUserDataBy(username as string);
    const subscribers = await UserSubscriptionsService.getUserSubscribers(
      result.id
    );
    const subscriptions = await UserSubscriptionsService.getUserSubscriptions(
      result.id
    );
    if (!result) {
      throw new Error('No user found');
    }
    return { props: { userData: result, subscriptions, subscribers } };
  }
);
