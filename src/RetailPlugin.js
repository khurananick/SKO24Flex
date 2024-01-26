import React from 'react';

import { CustomizationProvider } from "@twilio-paste/core/customization";
import { FlexPlugin } from '@twilio/flex-plugin';

import NoActiveTask from './components/NoActiveTask';

import RetailWrapper from './components/RetailWrapper';

const PLUGIN_NAME = 'RetailPlugin';

export default class RetailPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {

    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    });
    
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      //initialFirstPanelSize: '400px',
      minimumSecondPanelSize: '1050px',
    };

    flex.Actions.addListener("afterSelectTask",  (payload, abortFunction) => {
      if(payload?.task?.channelType === "voice")
        flex.AgentDesktopView.Panel2.Content.replace(<RetailWrapper key={"retailWrapper"}/>)
    });
  }
}
