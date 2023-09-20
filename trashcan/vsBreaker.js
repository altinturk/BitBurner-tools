target = args[0];

tprintf("Pinging server: [%s]", target);

if (target == "darkweb") {
	tprintf("[%s] exiting. cannot be hacked.", target);
	exit();
}


if (hasRootAccess(target)) {
	tprintf("[%s] skipping, already rooted", target);
	exit();
}


//tprintf("[%s] Hacking level %d / %d curr/dest", getHackingLevel(), getServerRequiredHackingLevel(target));

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


installBackdoor(target);
tprintf("[%s] backdoor installed", target);

hack(target);
tprintf("[%s] first hack done", target);

tprintf(" ****** botnet-single-breaker done ******* ");

//scp("hack-A0.script", hostname);
	//exec("hack-A0.script", hostname, 24, 'iron-gym');