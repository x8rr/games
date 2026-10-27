// Rewarded-video stub (self-hosted): always ready, always completes with reward.
window.InitRV = function InitRV(id) {
  setTimeout(function () { try { gameInstance.SendMessage("MainMenuManagers", "RvReady"); } catch (e) {} }, 0);
  window.showRV = function () {
    setTimeout(function () { try { gameInstance.SendMessage("MainMenuManagers", "RvWatchComplete", "true"); } catch (e) {} }, 0);
  };
};
