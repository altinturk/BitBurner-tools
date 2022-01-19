/** @param {NS} ns **/
export async function main(ns) {
    //stolen directly from steam guides
    //sketch.script
    var target = "hong-fang-tea";
    var moneyThresh = ns.getServerMaxMoney(target);
    var securityThresh = Math.round(ns.getServerMinSecurityLevel(target) * 0.6); //getServerMinSecurityLevel(target) + getServerBaseSecurityLevel(target) / 2; //5; //

    ns.tprintf("getServerMinSecurityLevel %d", ns.getServerMinSecurityLevel(target));
    /*tprintf("getServerSecurityLevel %d", ns.getServerSecurityLevel(target));
    tprintf("getServerBaseSecurityLevel %d", ns.getServerBaseSecurityLevel(target));
    tprintf("securityThresh %d", securityThresh);
*/
    
}