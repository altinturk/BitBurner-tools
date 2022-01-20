/*var servers = ["n00dles","max-hardware","phantasy","comptek","zb-institute","avmnite-02h","foodnstuff","nectar-net","neo-net","silver-helix","the-hub","rothman-uni","lexo-corp","snap-fitness","unitalife","icarus","catalyst","rho-construction","aevum-police","global-pharm","deltaone","defcomm","univ-energy","nova-med","solaris","taiyang-digital","zeus-med","infocomm","zb-def","I.I.I.I","alpha-ent","aerocorp","omnia","netlink","summit-uni","crush-fitness","CSEC","sigma-cosmetics","joesguns","hong-fang-tea","zer0","omega-net","johnson-ortho","syscore","millenium-fitness","galactic-cyber","harakiri-sushi","iron-gym","darkweb"];
var counter = 0;
for (counter = 0; counter < servers.length; counter++) {
	target = servers[counter];
	exec("hack-B1.script", "home", 36, target);
	tprintf("[%s] running home script", target);
}

*/

/*
// Iterator we'll use for our loop
var i = 0;

// Continuously try to purchase servers until we've reached the maximum
// amount of servers
while (i < 24) {
	// Check if we have enough money to purchase a server
	var hostname = "pserv-" + i;
	scriptKill("hack-B1.script", hostname);
	scp("hack-A0.script", hostname);
	exec("hack-A0.script", hostname, 24, 'iron-gym');
	++i;

}

*/


var servers = ["n00dles"];
var counter = 0;
var message = "";

for (counter = 0; counter < servers.length; counter++) {
	//	tprintf("\n ServerName: %s", servers[counter]);

	target = servers[counter];

	//tprintf("Pinging server: %d / %d : [%s]", counter + 1, servers.length, target);
	message = message + "#" + (counter + 1) + "/" + servers.length + " SRV: " + target;
	message = message + " LVL: " + getHackingLevel() + "/" + getServerRequiredHackingLevel(target);
	if (fileExists("BruteSSH.exe")) {
		brutessh(target);
		message = message + " SSH";
	}
	if (fileExists("FTPCrack.exe")) {
		ftpcrack(target);
		message = message + "|FTP";
	}
	if (fileExists("relaySMTP.exe")) {
		relaysmtp(target);
		message = message + "|SMTP";
	}
	if (fileExists("HTTPWorm.exe")) {
		httpworm(target);
		message = message + "|HTTP";
	}
	if (fileExists("SQLInject.exe")) {
		sqlinject(target);
		message = message + "|SQL";
	}

	nuke(target);
	message = message + " [NUKED]";


	exec("hack-B1.script", "home", 36, target);
	message = message + " hackB1@home x36";
}

tprintf("%s", message);