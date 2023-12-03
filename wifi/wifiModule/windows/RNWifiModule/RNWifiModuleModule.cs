using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Wifi.Module.RNWifiModule
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNWifiModuleModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNWifiModuleModule"/>.
        /// </summary>
        internal RNWifiModuleModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNWifiModule";
            }
        }
    }
}
