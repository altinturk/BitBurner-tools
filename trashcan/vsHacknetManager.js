/** @param {NS} ns **/
export async function main(ns) {
	//stolen directly from steam guides
	while (true) {
		for (var i = 0; i < await ns.hacknet.numNodes(); i++) {
			if (await ns.getPlayer().money > await ns.hacknet.getLevelUpgradeCost(i, 1)) {
				await ns.hacknet.upgradeLevel(i, 1);
			}
			if (await ns.getPlayer().money > await ns.hacknet.getRamUpgradeCost(i, 1)) {
				await ns.hacknet.upgradeRam(i, 1);
			}
			if (await ns.getPlayer().money > await ns.hacknet.getCoreUpgradeCost(i, 1)) {
				await ns.hacknet.upgradeCore(i, 1);
			}
		}
		if (await ns.getPlayer().money > await ns.hacknet.getPurchaseNodeCost()) {
			await ns.hacknet.purchaseNode();
		}
		await ns.sleep(1000);
	}
}