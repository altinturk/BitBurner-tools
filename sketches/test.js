class ServerItem {
		name = "";
		hacklevel=1;
		portsrequired=1;
		rooted= false;

}


/** @param {NS} ns */
export async function main(ns) {

	// Disable Logs
	ns.disableLog("disableLog"); ns.disableLog("getHackingLevel"); ns.disableLog("getServerRequiredHackingLevel"); ns.disableLog("getServerNumPortsRequired"); ns.disableLog("brutessh"); ns.disableLog("ftpcrack"); ns.disableLog("relaysmtp"); ns.disableLog("httpworm"); ns.disableLog("sqlinject"); ns.disableLog("nuke"); ns.disableLog("exec"); ns.disableLog("asleep");


	// Open log window and show start of script in logs
	ns.tail(); 	
	ns.print("BOTNET 3 JS");

	var servers = ["4sigma","aerocorp","aevum-police","alpha-ent","applied-energetics","avmnite-02h","b-and-a","blade","catalyst","clarkinc","computek","crush-fitness","CSEC","darkweb","defcomm","deltaone","ecorp","foodnstuff","fulcrumassets","fulcrumtech","galactic-cyber","global-pharm","harakiri-sushi","helios","home","hong-fang-tea","I.I.I.I","icarus","infocomm","iron-gym","joesguns","johnson-ortho","kuai-gong","lexo-corp","max-hardware","megacorp","microdyne","millenium-fitness","n00dles","nectar-net","neo-net","netlink","nova-med","nwo","omega-net","omnia","omnitek","phantasy","powerhouse-fitness","rho-construction","rothman-uni","run4theh111z","sigma-cosmetics","silver-helix","snap-fitness","solaris","stormtech","summit-uni","syscore","taiyang-digital","The-Cave","the-hub","titan-labs","unitalife","univ-energy","vitalife","zb-def","zb-institute","zer0","zeus-med"];
	var i=0;

var iteration = 4560;
var myHackingLevel=9000;
var myScriptNameToRun ="hello"
var myScriptThreadAmount = 24000;

			var exeSSH = ns.fileExists("BruteSSH.exe");
			var exeFTP = ns.fileExists("FTPCrack.exe");
			var exeSMTP = ns.fileExists("relaySMTP.exe");
			var exeHTTP = ns.fileExists("HTTPWorm.exe");
			var exeSQL = ns.fileExists("SQLInject.exe");
			

var targetArray = [];
for(i=0;i<servers.length;i++) {
			var serv = new ServerItem();
			serv.hacklevel=ns.getServerRequiredHackingLevel(servers[i]);
			serv.name = servers[i];
			serv.rooted = ns.hasRootAccess(servers[i]);
			serv.portsrequired = ns.getServerNumPortsRequired(servers[i]);
			targetArray.push(serv);
			ns.print(serv.name);
}

ns.print(targetArray.length);

/* //this is ok
 ns.printf("╔═══════╤═════════════╤══════════════════════════════╤══════════════════════╤═════╤═════╤══════╤══════╤═════╗");
 ns.printf("║ #%4d │ Hack: %5d │ Script: %20s │ Thread: %5d        │ %3s │ %3s │ %4s │ %4s │ %3s ║",iteration,myHackingLevel,myScriptNameToRun,myScriptThreadAmount,exeSSH?"SSH":"   ", exeFTP?"FTP":"   ", exeSMTP?"SMTP":"    ", exeHTTP?"HTTP":"    ", exeSQL?"SQL":"   ");
 ns.printf("╟───────┴────────────┬┴──────┬──────╥────────────────┴───┬───────┬──────╥───┴─────┴─────┴────┬─┴─────┬┴─────╢");

		
		for(i=0;i<48;i++){
			ns.printf("║ %18s │ %5s │ %4d ║ %18s │ %5s │ %4d ║ %18s │ %5s │ %4d ║",servers[i+0],"*****",1337,servers[i+1],"*****",1337,servers[i+2],"*****",1337);		
			i=i+2;
		}

 ns.printf("╚════════════════════╧═══════╧══════╩════════════════════╧═══════╧══════╩════════════════════╧═══════╧══════╝");
		// */

  ns.run("runme.js", 2, "home", "n00dles");
  ns.tprintf("remote exec ok 2");
//  ns.tprint(`[${localeHHMMSS()}] Spawning spider.js`)
		ns.asleep(50000);

}


// ║╧│ ┼┴┬╧


		// //let me use all my params inside this func
		// //	printScreen(ns);
		// ns.printf("╔═══════╤═════════════╤════════════════════════╤══════════════════════╤═════╤═════╤══════╤══════╤═════╗");
		// ns.printf("║ #%4d │ Hack: %5d │ Script: %14s │ Thread: %5d        │ %3s │ %3s │ %4s │ %4s │ %3s ║",iteration,myHackingLevel,myScriptNameToRun,myScriptThreadAmount,exeSSH?"SSH":"   ", exeFTP?"FTP":"   ", exeSMTP?"SMTP":"    ", exeHTTP?"HTTP":"    ", exeSQL?"SQL":"   ");
		// ns.printf("╟───────┴──────────┬──┴────┬──────╥────────────┴─────┬───────┬──────╥─┴─────┴─────┴────┬─┴─────┬┴─────╢");
		// ns.printf("║ %16s │ %5s │ %4d ║ %16s │ %5s │ %4d ║ %16s │ %5s │ %4d ║","appli-energetics","*****",1337,"appli-energetics","*****",1337,"appli-energetics","*****",1337);
		// ns.printf("║ appli-energetics │ ***** │ 0000 ║ appli-energetics │ ***** │ 0000 ║ appli-energetics │ ***** │ 0000 ║");
		// ns.printf("║ appli-energetics │ ***** │ 0000 ║ appli-energetics │ ***** │ 0000 ║ appli-energetics │ ***** │ 0000 ║");
		// ns.printf("╚══════════════════╧═══════╧══════╩══════════════════╧═══════╧══════╩══════════════════╧═══════╧══════╝");

		// //	ns.printf("╟───────┼────────────────────────────────────────────────────────────────────────────── ║╧│ ┼┴┬╧  ──╢");

	

//runme content	
/** @param {NS} ns 
export async function main(ns) {

  const target = ns.args[0]
  const threads = ns.args[1]
  const delay = ns.args[2]

  ns.tprint(`runme exec on a1 ${target} a2 ${threads} a3 ${delay}`)
}

*/