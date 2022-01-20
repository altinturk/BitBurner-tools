servName = args[0];

//fundsAvailable = getServerMoneyAvailable(servName);
//fundsMax = getServerMaxMoney(servName);

//tprint("Hack-A0 is active for " + servName);

while (true) {
	//tprintf("Account $ : %.2f", fundsAvailable);

	//if (fundsAvailable > fundsMax * 0.5) {
		hack(servName);
		hack(servName);
	//}
	grow(servName);
	weaken(servName);

}