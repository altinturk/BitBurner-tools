//param 1 = target

target = args[0];
moneyThresh = getServerMaxMoney(target) * 0.5;
securityThresh = Math.round(getServerMinSecurityLevel(target) * 1.4); //getServerMinSecurityLevel(target) + getServerBaseSecurityLevel(target) / 2; //5; //

while (true) {
  if (getServerSecurityLevel(target) > securityThresh) {
    //If the server's security level is above our threshold, weaken it
    weaken(target);
  } else if (getServerMoneyAvailable(target) < moneyThresh) {
    //If the server's money is less than our threshold, grow it
    grow(target);
  } else {
    //Otherwise, hack it
    hack(target);
    if (fileExists('logger-on.js', 'home')) {
      tprint("[HACKED] " + getHostname() + "\\" + getScriptName() + ", \"Target\" : " + target);
    }
  }
}