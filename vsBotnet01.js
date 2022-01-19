var servers = ["n00dles","max-hardware","phantasy","comptek","zb-institute","avmnite-02h","foodnstuff","nectar-net","neo-net","silver-helix","the-hub","rothman-uni","lexo-corp","snap-fitness","unitalife","icarus","catalyst","rho-construction","aevum-police","global-pharm","deltaone","defcomm","univ-energy","nova-med","solaris","taiyang-digital","zeus-med","infocomm","zb-def","I.I.I.I","alpha-ent","aerocorp","omnia","netlink","summit-uni","crush-fitness","CSEC","sigma-cosmetics","joesguns","hong-fang-tea","zer0","omega-net","johnson-ortho","syscore","millenium-fitness","galactic-cyber","harakiri-sushi","iron-gym","darkweb"];
//var servers = scan(); //["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"];

var counter = 0;

for (counter = 0; counter < servers.length; counter++) {
	//	tprintf("\n ServerName: %s", servers[counter]);

	target = servers[counter];

	tprintf("Pinging server: %d / %d : [%s]", counter + 1, servers.length, target);

	if (target == "darkweb") {
		tprintf("[%s] exiting. cannot be hacked.", target);
	}
	else {
		if (hasRootAccess(target)) {
			tprintf("[%s] skipping, already rooted", target);
		}
		else {

			tprintf("[%s] Hacking level %d / %d curr/dest", target, getHackingLevel(), getServerRequiredHackingLevel(target));

			if (fileExists("BruteSSH.exe")) {
				brutessh(target);
				tprintf("[%s] BruteSSH done.", target);
			}
			if (fileExists("FTPCrack.exe")) {
				ftpcrack(target);
				tprintf("[%s] FTPCrack done.", target);
			}
			if (fileExists("relaySMTP.exe")) {
				relaysmtp(target);
				tprintf("[%s] relaySMTP done.", target);
			}
			if (fileExists("HTTPWorm.exe")) {
				httpworm(target);
				tprintf("[%s] HTTPWorm done.", target);
			}
			if (fileExists("SQLInject.exe")) {
				sqlinject(target);
				tprintf("[%s] SQLInject done.", target);
			}

			nuke(target);
			tprintf("[%s] nuked", target);


			//installBackdoor(target);
			//tprintf("[%s] backdoor installed", target);

			//hack(target);
			//tprintf("[%s] first hack done", target);

		}
	}

	exec("hack-B1.script", "home", 36, target);
	tprintf("[%s] running B1 script on home", target);
}

tprintf(" ****** botnet-breaker done ******* ");