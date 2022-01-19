/*while (true) {
  hack('n00dles');
  grow('n00dles');
  weaken('n00dles');
}*/



target = 'n00dles';
moneyThresh = getServerMaxMoney(target) * 0.75;
securityThresh = 4 //Math.round(getServerBaseSecurityLevel(target) / 3) + 2;

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
    tprint(getHostname() + "\\" + target + " hacked.");
  }
}