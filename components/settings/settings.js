import * as cManager from '../cManager.js'
import { ACCOUNT } from '../../Logic/accountManager.js';
import { NavComp } from '../../identities/nav/nav.js';

export const component = {
    domID: 'Settings',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

function render(DOM) {
    NavComp();


    DOM.innerHTML += `

    <header id="SettingsHeader">Settings</header>
    
    <div id="settingsContainer">
        <div id="LeftSideBox">

            <div class="SettingMenuContainer">
                <div class="SettingsDivs">
                    <img class="SettingsIcons" src ="./Images/person.png"></img>
                    <p>Account</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

            <div class="SettingMenuContainer">
                <div class="SettingsDivs">
                    <img class="SettingsIcons"  src ="./Images/Bell.png"></img>
                    <p>Notifications</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

            <div class="SettingMenuContainer">
                <div class="SettingsDivs">
                    <img class="SettingsIcons"  src ="./Images/Help.png"></img>
                    <p>Help</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

            <div class="SettingMenuContainer">
                <div class="SettingsDivs">
                    <img class="SettingsIcons"  src ="./Images/info.webp"></img>
                    <p>About</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

            <div class="SettingMenuContainer">
                <div class="SettingsDivs">
                    <img class="SettingsIcons" src ="./Images/language.svg"></img>
                    <p>Language</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

        </div>
        
        <div id="seperator"></div>

        <div id="RightSideBox">

            <div class="SettingMenuContainerLogout">
                <div class="SettingsDivs">
                    <img class="SettingsIcons"  src ="./Images/trashcan.png"></img>
                    <p>Delete Account</p>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>

            <div class="SettingMenuContainer">
                <div class="settingsDivs" id="logout">
                    <img class="SettingsIcons"  src ="./Images/logout.png"></img>
                    <button>Logga Ut</button>
                </div>
                <img class="chevron" src="./Images/chevron.png"></img>
            </div>
            
        </div>
    
    </div>
    `


    DOM.querySelector('button').onclick = () => ACCOUNT.logout();
}