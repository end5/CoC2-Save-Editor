import { loadEditor } from "./Editor";
import { state } from "./Data/State";

const editorVersion = "23";
const gameVersion = "0.1.17";
const lastBreakingVersion = "22";

document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.createElement("div");
    disclaimer.className = "disclaimer content dark";
    disclaimer.innerHTML = "<h2>CoC2 Save Editor v" + editorVersion + "</h2><h4>For use with versions of CoC2 " + gameVersion + " or higher</h4><p>Disclaimer: Editing any saves may permanently mess up the save or cause unusual bugs or errors in the game. Edit at your own risk and remember to back up your saves.</p><p>Saves edited with v" + lastBreakingVersion + " or earlier will not work.</p>";
    document.body.appendChild(disclaimer);

    const ok = document.createElement("button");
    ok.textContent = "Accept";
    ok.className = "tab dark";
    disclaimer.appendChild(ok);

    state.editObj = JSON.parse(`{"savestamp":1558197229055,"flags":{"NAV_DISABLED":0,"TUT_STATUS":5},"currentLocation":"HAWK_G34","timestamp":566,"version":"0.1.22","options":{"charOptions":{"easyMode":false,"sillyMode":false,"buttslutMode":false,"shortPregMode":true,"autosave":true},"systemOptions":{"defaultFont":false,"fontSize":1,"brightness":1,"disableBusts":false,"slowCombat":false,"combatFlowDefault":0,"autosaveDefault":true}},"camps":{},"saveEnable":true,"quests":[[0],[0],[0],[],[],[],[],[],[],[],[],[]],"chars":{"pc":{"name":"asdf","class":1,"background":1,"exp":225,"hitPoints":105,"perks":[{"key":"StartingAttributeBonuses","values":[0,1,0,0,0,2]},{"key":"WellHung","values":[]},{"key":"Veteran","values":[]}],"powers":[{"key":"NormalAttack"},{"key":"GuardedStance"},{"key":"Rend"},{"key":"ThunderStrike"}],"equippedPowers":[{"key":"GuardedStance"},{"key":"Rend"},null,{"key":"ThunderStrike"},null],"credits":105,"weaponPrimary":{"key":"ShortSword","args":[1]},"femininity":20,"tallness":70,"tone":95,"thickness":25,"hipRatingRaw":5,"buttRatingRaw":5,"bellyRatingRaw":1,"eyeColor":"blue","_balls":2,"cocks":[{"type":1,"virgin":true,"tags":[],"lengthRaw":6,"lengthMod":0,"thicknessRatioRaw":1,"thicknessRatioMod":0,"flaccidRatio":0.4,"_knotRatio":1.5,"pierced":0,"_color":""}],"lastRechargeEquipped":1,"_race":{"key":"Human"}},"champ":{},"cait":{},"berwyn":{},"arona":{},"brint":{},"kiyoko":{},"etheryn":{},"gwyn":{},"kinu":{},"eryka":{},"garret":{},"lusina":{},"kasyrra":{},"shar":{}},"party":{"members":["pc"],"guest":null},"hash":"0aa50f8e5b34b94612e4927e36926cd2"}`);
    ok.addEventListener("click", () => loadEditor(document.body, state));
});
