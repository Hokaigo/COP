
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.jsx';
reactComponents['App'] = Component0;

import Component1 from '../src/contexts/AuthContext.jsx';
reactComponents['AuthProvider'] = Component1;

import Component2 from '../src/components/game/Board.jsx';
reactComponents['Board'] = Component2;

import Component3 from '../src/components/game/Cell.jsx';
reactComponents['Cell'] = Component3;

import Component4 from '../src/components/common/CookiePopup.jsx';
reactComponents['CookiePopup'] = Component4;

import Component5 from '../src/components/common/Footer.jsx';
reactComponents['Footer'] = Component5;

import Component6 from '../src/components/common/modal/GameResultsModal.jsx';
reactComponents['GameResultsModal'] = Component6;

import Component7 from '../src/components/common/routes/GuestRoute.jsx';
reactComponents['GuestRoute'] = Component7;

import Component8 from '../src/components/common/Header.jsx';
reactComponents['Header'] = Component8;

import Component9 from '../src/pages/LoginPage.jsx';
reactComponents['LoginPage'] = Component9;

import Component10 from '../src/pages/MainPage.jsx';
reactComponents['MainPage'] = Component10;

import Component11 from '../src/pages/NotFoundPage.jsx';
reactComponents['NotFoundPage'] = Component11;

import Component12 from '../src/pages/PrivacyPage.jsx';
reactComponents['PrivacyPage'] = Component12;

import Component13 from '../src/pages/ProfilePage.jsx';
reactComponents['ProfilePage'] = Component13;

import Component14 from '../src/components/common/routes/ProtectedRoute.jsx';
reactComponents['ProtectedRoute'] = Component14;

import Component15 from '../src/pages/RegisterPage.jsx';
reactComponents['RegisterPage'] = Component15;

import Component16 from '../src/components/common/modal/SettingsModal.jsx';
reactComponents['SettingsModal'] = Component16;

import Component17 from '../src/pages/StartPage.jsx';
reactComponents['StartPage'] = Component17;