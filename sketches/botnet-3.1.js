/** @param {NS} ns */
export async function main(ns) {

	// Disable Logs
	ns.disableLog("disableLog"); ns.disableLog("getHackingLevel"); 
	ns.disableLog("getServerRequiredHackingLevel");
	ns.disableLog("getServerNumPortsRequired");
	ns.disableLog("brutessh");
	ns.disableLog("ftpcrack");
	ns.disableLog("relaysmtp");
	ns.disableLog("httpworm");
	ns.disableLog("sqlinject");
	ns.disableLog("nuke");
	ns.disableLog("exec");

	// Open log window and show start of script in logs
	ns.tail(); 	
	ns.print("BOTNET 3 JS");

	var servers = ["4sigma","aerocorp","aevum-police","alpha-ent","applied-energetics","avmnite-02h","b-and-a","blade","catalyst","clarkinc","computek","crush-fitness","CSEC","darkweb","defcomm","deltaone","ecorp","foodnstuff","fulcrumassets","fulcrumtech","galactic-cyber","global-pharm","harakiri-sushi","helios","home","hong-fang-tea","I.I.I.I","icarus","infocomm","iron-gym","joesguns","johnson-ortho","kuai-gong","lexo-corp","max-hardware","megacorp","microdyne","millenium-fitness","n00dles","nectar-net","neo-net","netlink","nova-med","nwo","omega-net","omnia","omnitek","phantasy","powerhouse-fitness","rho-construction","rothman-uni","run4theh111z","sigma-cosmetics","silver-helix","snap-fitness","solaris","stormtech","summit-uni","syscore","taiyang-digital","The-Cave","the-hub","titan-labs","unitalife","univ-energy","vitalife","zb-def","zb-institute","zer0","zeus-med"];

	//var counter = 0;
	//var message = "";
	//var openedPorts = 0;

	var myScriptNameToRun = "hack-B1.script"; // "hackItem.js"; //js does not get args yet
	var myScriptThreadAmount = 24000;
	var myScriptHost = "home";
	var target = '';
	//var myCounterReadable = 0;

	for (var counter = 0; counter < servers.length; counter++) {

		target = servers[counter];

		//message = "#" + (counter + 1) + "/" + servers.length + " [" + target + "]";
		var openedPorts = 0;


		var myCounterReadable = counter +1;
		var myHackingLevel = ns.getHackingLevel();

		var targetHackingLevel = ns.getServerRequiredHackingLevel(target);
		var targetPortsRequired = ns.getServerNumPortsRequired(target);
		var isTargetRooted = ns.hasRootAccess(target);

		var _SSH = false;
		var _FTP = false;
		var _SMTP = false;
		var _HTTP = false;
		var _SQL = false;
	/*
		if (isTargetRooted) {
			tellerOK(myCounterReadable,servers.length,target);
		}*/
		if (myHackingLevel < targetHackingLevel) {
			//message = message + " INSUFF Hack: " + myHackingLevel + "/" + targetHackingLevel;
			tellerInsufHack(ns,myCounterReadable,servers.length,target,myHackingLevel,targetHackingLevel);
		}
		else {
		//	message = message + " LVL: " + myHackingLevel + "/" + targetHackingLevel;
			
			if (ns.fileExists("BruteSSH.exe")) {
				ns.brutessh(target);
				_SSH = true;
				openedPorts = openedPorts + 1;
			}
			if (ns.fileExists("FTPCrack.exe")) {
				ns.ftpcrack(target);
				_FTP = true
				openedPorts = openedPorts + 1;
			}
			if (ns.fileExists("relaySMTP.exe")) {
				ns.relaysmtp(target);
				_SMTP = true;
				openedPorts = openedPorts + 1;
			}
			if (ns.fileExists("HTTPWorm.exe")) {
				ns.httpworm(target);
				_HTTP = true;
				openedPorts = openedPorts + 1;
			}
			if (ns.fileExists("SQLInject.exe")) {
				ns.sqlinject(target);
				_SQL = true;
				openedPorts = openedPorts + 1;
			}

			if (targetPortsRequired > openedPorts) {
				//message = message + " PORTS NEEDED:" + openedPorts + "/" + targetPortsRequired;
				tellerOpenPorts(ns,myCounterReadable,servers.length,target,myHackingLevel,targetHackingLevel,_SSH,_FTP,_SMTP,_HTTP,_SQL,openedPorts + "/" + targetPortsRequired);
			}
			else {
				ns.nuke(target);
				isTargetRooted = ns.hasRootAccess(target);
				if (isTargetRooted) {
					//message = message + " [nuked]";

					ns.exec(myScriptNameToRun, myScriptHost, myScriptThreadAmount, target);
					//message = message + " hackB1@home x240";

				} else {
					//message = message + " [NOT NUKED] [not script running]";
				}
				teller(ns,myCounterReadable,servers.length,target,myHackingLevel,targetHackingLevel,_SSH,_FTP,_SMTP,_HTTP,_SQL,isTargetRooted,myScriptNameToRun,myScriptThreadAmount);
			}

			//backdoor requires advanced level in the game....
			//installBackdoor(target);
			//tprintf("[%s] backdoor installed", target);
			//hack(target);
			//tprintf("[%s] first hack done", target);

		}
	}
}



function teller(ns, counter,listLength,serverName,myLvl,reqLvl,isSSHd,isFTPd,isSMTPd,isHTTPd,isSQLd,isNuked,scriptToRun,scriptThreadCount) {
	// [23:38:31] #49/70 [powerhouse-fitness] LVL: 1378/1036 SSH|FTP|SMTP|HTTP|SQL [nuked] hackB1@home x240
	//          [ #000/000 - xxxxxiiiiioooooiiiii - root - 0000:0000 - SSH - FTP - SMTP - HTTP - SQL - ssssssssss * 0000 ]

		ns.printf("[#%3d/%3d - %20s - %s - %4d:%-4d -%s-%s-%s-%s-%s- %15s*%-4d]", counter, listLength, serverName, isNuked?"root":"  $>", myLvl, reqLvl, isSSHd?"SSH":"   ", isFTPd?"FTP":"   ", isSMTPd?"SMTP":"    ", isHTTPd?"HTTP":"    ", isSQLd?"SQL":"   ", scriptToRun, scriptThreadCount);
}

function tellerOK(ns,counter,listLength,serverName) {
	//           [#000/000 - xxxxxiiiiioooooiiiii - root                                                                 ]
		ns.printf("[#%3d/%3d - %20s - root%57s]", counter, listLength, serverName,"");
}

function tellerInsufHack(ns,counter,listLength,serverName,myLvl,reqLvl) {
	//           [#000/000 - xxxxxiiiiioooooiiiii - __$> - 0000:0000 insufficient                                                    ]
		ns.printf("[#%3d/%3d - %20s -   $> - %4d:%-4d - insufficient%30s]", counter, listLength, serverName,myLvl,reqLvl,"");
}

function tellerOpenPorts(ns,counter,listLength,serverName,myLvl,reqLvl,isSSHd,isFTPd,isSMTPd,isHTTPd,isSQLd,neededPorts) {
	//          [ #000/000 - xxxxxiiiiioooooiiiii - root - 0000:0000 - SSH - FTP - SMTP - HTTP - SQL - open more ports   ]
		///tprintf("[#%3d/%3d - %20s - %s - %4d:%-4d -%s-%s-%s-%s-%s- open more ports     ]", counter, listLength, serverName, "  $>", myLvl, reqLvl, isSSHd?"SSH":"   ", isFTPd?"FTP":"   ", isSMTPd?"SMTP":"    ", isHTTPd?"HTTP":"    ", isSQLd?"SQL":"   ");
		ns.printf("[#%3d/%3d - %20s - %s - %4d:%-4d -%s-%s-%s-%s-%s- %3s ports to open   ]", counter, listLength, serverName, "  $>", myLvl, reqLvl, isSSHd?"SSH":"   ", isFTPd?"FTP":"   ", isSMTPd?"SMTP":"    ", isHTTPd?"HTTP":"    ", isSQLd?"SQL":"   ",neededPorts);
}
