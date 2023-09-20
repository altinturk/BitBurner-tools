/** @param {NS} ns */
export async function main(ns) {

	//param 1 = target
	const target = ns.args[0];

	//ns.tprint(`runme exec on a1 ${target}`);
	var moneyThresh = ns.getServerMaxMoney(target) * 0.5;
	var securityThresh = Math.round(ns.getServerMinSecurityLevel(target) * 1.4); //getServerMinSecurityLevel(target) + getServerBaseSecurityLevel(target) / 2; //5; //

	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			//If the server's security level is above our threshold, weaken it
			ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			//If the server's money is less than our threshold, grow it
			ns.grow(target);
		} else {
			//Otherwise, hack it
			ns.hack(target);
		}

		await ns.asleep(1000); //sleep 10 secs
	}
}