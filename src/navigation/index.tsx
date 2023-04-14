import React, { useState } from 'react';
import { Screens } from '../constants';
import { HomeScreen } from '../screens/Home';
import { BezierCurveScreen } from '../screens/BezierCurve';
import { BeaconBeamScreen } from '../screens/BeaconBeam';

const templateScreen: { [key: string]: JSX.Element } = {
  [Screens.HOME]: <HomeScreen />,
  [Screens.BEZIER_CURVE]: <BezierCurveScreen />,
  [Screens.BEACON_BEAM]: <BeaconBeamScreen />,
};

export const NavigationContext = React.createContext({
  currentScreen: Screens.HOME,
  navigate: (screen: string) => {},
});

export const ContextNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<string>(Screens.HOME);

  const navigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
      }}
    >
      {templateScreen[currentScreen]}
    </NavigationContext.Provider>
  );
};
