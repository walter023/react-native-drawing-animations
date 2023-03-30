import React, { useState } from 'react';
import { Screens } from '../constants';
import { HomeScreen } from '../screens/Home';
import { BezierCurveScreen } from '../screens/BezierCurve';

const templateScreen = {
  [Screens.HOME]: <HomeScreen />,
  [Screens.BEZIER_CURVE]: <BezierCurveScreen />,
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
