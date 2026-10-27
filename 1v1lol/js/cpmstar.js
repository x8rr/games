// Ad stub (self-hosted): interstitials finish immediately.
function iAdPause() {}
function iAdUnpause() { unityAdFinishedCallback(); }
function requestNewAd() { unityAdFinishedCallback(); }
function unityAdFinishedCallback() {
    try { if (gameInstance) gameInstance.SendMessage('MainMenuManagers', 'OnWebCallback'); }
    catch (error) { console.log(error); }
}
