var servers = ["n00dles", "max-hardware", "phantasy", "comptek", "zb-institute", "avmnite-02h", "foodnstuff", "nectar-net", "neo-net", "silver-helix", "the-hub", "rothman-uni", "lexo-corp", "snap-fitness", "unitalife", "icarus", "catalyst", "rho-construction", "aevum-police", "global-pharm", "deltaone", "defcomm", "univ-energy", "nova-med", "solaris", "taiyang-digital", "zeus-med", "infocomm", "zb-def", "I.I.I.I", "alpha-ent", "aerocorp", "omnia", "netlink", "summit-uni", "crush-fitness", "CSEC", "sigma-cosmetics", "joesguns", "hong-fang-tea", "zer0", "omega-net", "johnson-ortho", "syscore", "millenium-fitness", "galactic-cyber", "harakiri-sushi", "iron-gym", "darkweb"];
//var servers = scan(); //["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"];
var counter = 0;
var message = "";

for (counter = 0; counter < servers.length; counter++) {

	target = servers[counter];

	message = "#" + (counter + 1) + "/" + servers.length + " [" + target + "]";

	if (hasRootAccess(target)) {
		message = message + " skipping, already rooted";
	}
	else {
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
		if (hasRootAccess(target)) {
			message = message + " [nuked]";
		} else {
			message = message + " [NOT NUKED]";
		}


		//installBackdoor(target);
		//tprintf("[%s] backdoor installed", target);

		//hack(target);
		//tprintf("[%s] first hack done", target);

	}
	exec("hack-B1.script", "home", 36, target);
	message = message + " hackB1@home x36";

	tprintf("%s", message);
}