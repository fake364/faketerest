import React from 'react';
import FakeCard from './fakeCard/FakeCard';

type Props = {};

const FakeBuilderContainer: React.FC<Props> = () => {
  return (
    <div className="fixed h-screen w-screen overflow-y-scroll flex flex-col items-center">
      <FakeCard  />
    </div>
  );
};

export default FakeBuilderContainer;