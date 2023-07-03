//=============================================================================
// GANG V6 - Requires 3 GB RAM by Troff

//Note: This is a NON-HACK (i.e. combat gang) gang script.
//Version 6 - added automated config file handling (no more manual stuff!)
// BETTER ASCENSION rules, also included better war management and also
// excluding buying of non-combat equipment to save some money.

//You can turn ON lines marked "DEBUG" to get a further understanding or
// for troubleshooting. Feel free to delete them (as they're not required)

/** @param {NS} ns **/
export async function main(ns) {

    // ===============================================
    // SETTINGS START (change as required)
    var lenCom = 16;  //Text length of gang member's task displayed
    let buyStuff = 1; //Can gang members buy equipment? 1=Yes, 0=No
        let minCash= 50111222; //Min cash to keep (gang equipment is costly)
        //let minCash= 52333111222; //Min cash (25/50B for Stock market API)
        //let minCash= 150333111222; //Min cash (150B to start a corp)
    let maxrank = 6;	// Max rank to track for each gang member
    let equiprank = 2;	// Rank at which members can buy equipment (default: 2)
    let defaulttask = "Traffick Illegal Arms"; //Default task if no criteria met
    let sleepdelay = 16000; // Pause in milliseconds between each loop
    
    // War team (e.g. the first 6) stop automatically once we hit 100% territory
    let warguys = 6;	// Number of gang members to engage in territory warfare
    let minwarguys = 9;	// Minimum gang before we can start warfare
    let warchance = 0.97; // Minimum win chance before we start war with gangs
    
    // ### Ascension & Rank settings (adjust as required) ###
    // Read up on gang level progression. You should do a clean run & note 
    //  your own rules/levels etc- we use rank numbers to track certain things, 
    //  e.g. 4=934 stats, 5=56k. Insert more if needed, but need adjust some code
    let ascend = true;	// do we check ascensions?
    let minmult = 2.00	// 2.0 minimum (relative) multiplier before we ascend
    let rnk1 = 98; 	   	// Rank 1 (gives a x2 multiplier) 
    let rnk2 = 274; 	// Rank 2 (gives a x4 multiplier, +0.25 rate)
    let rnk3 = 550;   	// Rank 3 (gives x6 multiplier)
    let rnk4 = 934; 	// Rank 4 (x8 multiplier)
    let rnk5 = 56000; 	// Rank 5 (x19 multiplier with mods)
    //let rnk6 = 145111; 	// Rank 6 (x36 multiplier with mods)
    
    // Criteria for when to start Vigilante work to lower Wanted level
    let minVResp = 1;	// Minimum respect to do vigilante work
    let minVPen = 10;	// If Penalty above this then do vigi work
    let minVWant = 5;	// If Wanted level above this then do vigi
    let minVRank = rnk2; // Minimum member ascension rank to vigi
    
    // SETTINGS END
    // ===============================================
    
    // Set DEFAULT VARIABLES (don't change anything)
    let loops = 0;	// keeps track of loops 
    
    // Set default ascension ranks of members. Members are named 0, 1, 2, etc
        let ascmem = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // Relative multiplier for gang member
        let asMult2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let didasc = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];// Did we ascend?
    let lengthdump = 0; // Default gang size read from cfg file
    let warfare = false; // Set territory warfare to false
    
    // Set default gang territory (need more variables as turnover is longer)
    var gangt0 = 0; var gangt1 = 0;  var gangt2 = 0; let gangtx = 0;
    let ganginwar = 0; // Set counter for number members in territory warfare
    
    // Disable Logs
    ns.disableLog("disableLog"); ns.disableLog("asleep"); ns.disableLog("exec");
    ns.disableLog("getServerMoneyAvailable");ns.disableLog("gang.ascendMember");
    ns.disableLog("gang.setMemberTask");ns.disableLog("gang.purchaseEquipment");
    ns.disableLog("gang.recruitMember");ns.disableLog("gang.setTerritoryWarfare");
    
    // Open log window and show start of script in logs
    ns.tail(); 	
    ns.print("🔥 GANG SCRIPT START 🔥");
    
    // Attempt to read current gang member ranks from text config file
        //ns.print("Starting to read gang txt file... ");	// DEBUG
    if ( ns.fileExists("/Temp/gang-cfg.txt", "home") ){
        ns.print("INFO ## Gang txt file EXISTS ##")
         let listnames = []; 
        var datadump = JSON.parse(ns.read("/Temp/gang-cfg.txt"));
        if (datadump.length > 0) {
            lengthdump = datadump.length; // Transfer value for checking later
            for (var ij = 0; ij < datadump.length; ij++) { 
                listnames[ij] = datadump[ij].name;
                ascmem[ij] = datadump[ij].ascmem;
                ns.print("N: ", listnames[ij], " Asc: ", ascmem[ij])
            }
        }
    } 
        
    // If number of gang members is too low, we need to reset the config file
    // (this assumes in subsequent launches you'll have more than 3 guys)
    // Once you're up and running with more than 3 guys this is ignored
    if (lengthdump < 4) { 
        const resetconfig = await resetGangFile(ns); 
        //ns.sleep(100); // To be safe, delay a bit when writing file
        ns.print ("Resetting gang file: ", resetconfig); 
        // Meanwhile here in program, load the reset variables into memory
        ascmem = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    // ###################################
    //       MAIN WHILE LOOP START
    while (true) {
    
    // RECRUIT MEMBERS
    var canrecruit = await runCom1(ns, 'ns.gang.canRecruitMember()', 'canRecr'); 
        //ns.print("INFO Can recruit: " + canrecruit); // DEBUG
    while ( canrecruit == true ) { 
        for (let ij = 0; ij < 30; ++ij) {
            var canrecruit=await runCom1(ns,'ns.gang.recruitMember()','Recruit'); 
            //ns.print("INFO Can recruit: " + canrecruit); // DEBUG
                if (canrecruit == true) {
                    ns.print("🔴RECRUITED: " + ij + "🔴");
                }
        }
    }
    
    // Get Gang info, cash, equipment, Respect & names
    let myGang = await runCom1(ns, 'ns.gang.getGangInformation()', 'getGangInfo'); 
    let curCash=await runCom1(ns, 'ns.getServerMoneyAvailable(ns.args[0])','getSerMon', ["home"]);  
    let allEquipment = await runCom1(ns, 'ns.gang.getEquipmentNames()', 'getEqName'); 
        var curResp = ns.nFormat(myGang.respect, "0,0.a"); 
        var curResp2 = myGang.respect;
        //ns.print("Respect: " + curResp2); // DEBUG
    let members = await runCom1(ns, 'ns.gang.getMemberNames()','getMemNam');
            
    // Get Territory % and get 'wanted over respect' level 
    var ganginfo = await runCom1(ns,'ns.gang.getGangInformation()','getGangInfo');
    gangtx = ganginfo.territory; 
    var curResp = ganginfo.respect;
    var curWant = ganginfo.wantedLevel;
    var curPena2b = ganginfo.wantedLevel/ganginfo.respect * 100;
    //ns.print("🔴Want/Respect: " + ns.nFormat(curPena2b, "0,0.00") +" %" );
    
    // //Reset check for gang members in territory warfare & reset warfare status
    ganginwar = 0; 
    warfare = false;
    didasc = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // Reset "Did we ascend?"
    // @@@@@@@@@ ASCEND SECTION START @@@@@@@@
    // Check ascension rules
    if (ascend == true) {	
            
        for (let ij = 0; ij < members.length; ++ij) {
            let member = members[ij];
                    
            //// Get member stats again
            var memberInfo = await runCom1(ns, 'ns.gang.getMemberInformation(ns.args[0])','getMemInf', [member]);
            var memstr = memberInfo.str;	var memdef = memberInfo.def;
            var memdex = memberInfo.dex;	var memagi = memberInfo.agi;
    
            // (To get CURRENT multiplier use memberInfo.str_asc_mult)
            // Now get member FUTURE multipliers (returns a multiple)
            var asMult1 = await runCom1(ns, 'ns.gang.getAscensionResult(ns.args[0]).str','getAscMul', [member]);
            //ns.print(ij+". Multiplier: ", asMult2); //DEBUG
            if (asMult1 == null) { // NULL means we can't ascend
                asMult2[ij] = 0; } else { asMult2[ij] = Number(asMult1); }
            //ns.print(ij+". Multi2: ", asMult2[ij] ); // DEBUG
    
            //█ Ascend if multiplier is x2 of current & rank more than 4
            if (asMult2[ij] >= minmult && ascmem[ij]>=4 ){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Multiplier x2, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                //ascmem[ij] = 7;	// Set ascension status rank to 5
            }
        /*	//█ Ascend to rank 6 [EXAMPLE OF Custom Ascension Rule]
            if (memstr>=rnk6 && ascmem[ij]==5 && maxrank >=6 ){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                ns.print("🌟Rank 5>6, "+member+" ascended! 🌟");//DEBUG
                ascmem[ij] = 6;	// Set ascension status rank to 6
            } */
            //█ Ascend to rank 5
            if (memstr>=rnk5 && ascmem[ij]==4 && maxrank >=5 ){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Rank 4>5, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                ascmem[ij] = 5;	// Set ascension status rank to 5
            }
            //█ Ascend to rank 4
            else if (memstr>=rnk4 && ascmem[ij]==3 && maxrank >= 4 ){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Rank 3>4, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                ascmem[ij] = 4;	// Set ascension status rank to 4
            }
            //█ Ascend to Rank 3 to boost xp on way to rank 4, approx 25 mins
            else if (memstr>=rnk3 && memagi>=rnk3 && ascmem[ij]==2){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Rank 2>3, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                ascmem[ij] = 3;	// Set ascension status rank to 3
            } 
            //█ Ascend to rank 2
            else if(memstr>=rnk2 && memagi>=rnk2 && ascmem[ij]==1) {
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Rank 1>2, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                ascmem[ij] = 2;	// Set ascension status rank to 2
            } 
            //█ Ascend Rank 1 early to 'boost' xp gain, approx 25 mins
            else if (memstr>=rnk1 && memagi>=rnk1 && ascmem[ij]==0){
                await runCom1(ns,'ns.gang.ascendMember(ns.args[0])','ascMem', [member]);
                //ns.print("🌟Rank 0>1, "+member+" ascended! 🌟");//DEBUG
                didasc[ij] = 1;
                ascmem[ij] = 1;	// Set ascension status rank to 1
            } 
        }				
    }
    // @@@@@@@@@ ASCEND SECTION END @@@@@@@@
    
    // Resize the log window to the width of the red dots for perfect fit
    ns.print(" ");	// Blank line to seperate loops
    ns.print("╔═════════════════ GANG ═════════════════╗");
    
    
    // ###### MAIN FOR LOOP START ##### 
    for (let ij = 0; ij < members.length; ++ij) {
        var member = members[ij];
        var memberInfo = await runCom1(ns, 'ns.gang.getMemberInformation(ns.args[0])','getMemInf', [member]);
    
        // @@@@@@@@ Check Equipment START @@@@@@@@@@@
        var cashSpen = 0;	// Track cash spent in loop
        //ns.print("👜BUYSTUFF: " + buyStuff);  // DEBUG
        //ns.print("*members.length: " + members.length);  // DEBUG
        if (buyStuff==1) { 
            for (var j = 0; j < allEquipment.length; ++j) {
                var equipment = allEquipment[j];
                //var eqdebug=equipment.toString(); ns.print(eqdebug); //DEBUG
                //ns.print("Chk: ",equipment," = ",memberInfo.upgrades.indexOf(equipment));
                //Above returns AWM Sniper Rifle 12, Graphene Armor -1 etc //DEBUG
                //ns.print("Checking: ",equipment); // DEBUG
    
                //If guy at certain rank & doesn't have NON-HACKING stuff, buy it
                if ( ( (memberInfo.upgrades.indexOf(equipment) == -1) || (memberInfo.augmentations.indexOf(equipment) == -1) ) && ascmem[ij] >= equiprank && equipment != "NUKE Rootkit" && equipment != "Soulstealer Rootkit" && equipment != "Demon Rootkit" && equipment != "Hmap Node" && equipment != "Jack the Ripper" && equipment != "DataJack" && equipment != "Neuralstimulator" && equipment != "BitWire") {
    
                    var cost = await runCom1(ns, 'ns.gang.getEquipmentCost(ns.args[0])','getEqCost', [equipment]);
                    if (  (cost + minCash) < curCash ) { 
                        var gangbuy = await runCom1(ns, 'ns.gang.purchaseEquipment(ns.args[0], ns.args[1])','getEqCost', [member, equipment]); 
                        //ns.print("gangbuy: " + gangbuy); // DEBUG
                        if (gangbuy == true) {
                            cashSpen = cashSpen + cost;
                            ns.print("👜: " + equipment + " @" + member);
                            curCash=await runCom1(ns, 'ns.getServerMoneyAvailable(ns.args[0])','getSerMon', ["home"]);  
                        }
                    }
                }
            } 
        } 
        // @@@@@@@@@@ Check Equipment END @@@@@@@@@@@
    
        // Get member variables
        var memstr = memberInfo.str;	// Strength
        var memdef = memberInfo.def;	// Defence
        var memdex = memberInfo.dex;	// Dexterity
        var memagi = memberInfo.agi;	// Agility
    
        //##############################################################
        //ASSIGN Tasks (series of "if else" statements, edit as desired)
            
        //█Wanted status: If too high then go vigilante to lower it
        if (curResp>minVResp && curPena2b>minVPen && curWant>minVWant && memstr>minVRank) { 
            var gangtask = "Vigilante Justice"; 
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print("║ 📱"+ij +". 🚶:"+member+" >"+gangtask.substring(0,lenCom) );
        }
    
        //█TRAINING: If ranked 0-4, train Combat until combat stats Ranked 4
        else if ( (memstr<rnk4 || memdef<rnk4 ||memagi<rnk4) && (ascmem[ij]==0 || ascmem[ij]==1 || ascmem[ij]==2 || ascmem[ij]==3 || ascmem[ij]==4) ) {
            var gangtask = "Train Combat"; 
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print("║ 📱"+ij +". 🚶:"+member+" >"+gangtask.substring(0,lenCom) );
        }	
    
        //EXAMPLE of further criteria that can be inserted easily using if's
        //█Rank5: Train Combat until stats ranked 5, for members 3-11 only
        /* else if ( (memstr<rnk5 ||memdef<rnk5 ||memagi<rnk5) && (ascmem[ij]==2||ascmem[ij]==3 || ascmem[ij]==4 ) && members.length > 3 && members.length < 12 && maxrank == 3 ){
            var gangtask = "Train Combat";
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print(ij +". 🚶:" + member + " >" + gangtask.substring(0,lenCom) );
        } */
    
        //█Terrorism: Do until Respect reaches 10 million (for ascension use)
        else if (curResp2 < 10111222) { 
            var gangtask = "Terrorism";
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print("║ 📱"+ij +". 🚶:"+member+" >"+gangtask.substring(0,lenCom) );	}
    
            //█TERRORITY WARFARE: Set task if guy is over rank 2, members reached, 
        // is part of war team (warguys) and territory < 100% conquered (gangtx)
        else if(ascmem[ij] > 2 && members.length >= minwarguys && (ij >= 0 && ij < warguys) && gangtx<1){
            ganginwar = ganginwar + 1; // Increment counter for gangs in warfare
            var gangtask = "Territory Warfare";
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
                //ns.print("DEBUG Territory Gangtx = "+ gangtx );	// DEBUG
                //ns.print("DEBUG ganginwar = "+ ganginwar );	// DEBUG
            ns.print("║ 📱"+ij +". 🚶:"+member+" > "+gangtask.substring(0,lenCom) );
        
            //Check war chances against clans
                const dowewar=await checkgangwar(ns, warchance);//Warcheck function
                if (dowewar == true) {
                    warfare = true;
                    await runCom1(ns, 'ns.gang.setTerritoryWarfare(ns.args[0])','setWar', [true]);
                    //ns.print("WARN War status changed: "+ warfare ); //DEBUG
                } else {
                    await runCom1(ns, 'ns.gang.setTerritoryWarfare(ns.args[0])','setWar', [false]);
                }
        }
    
        //█Trafficking/Illegal Arms: (money making actions here!)
        //If we have enough respect, do money gathering task
        else if (curResp2 > 10111222) { 
            var gangtask = "Traffick Illegal Arms";
            //var gangtask = "Human Trafficking"; // Change to this if desired
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print("║ 📱"+ij +". 🚶:"+member+" > "+gangtask.substring(0,lenCom) );
        }
    
        //█DEFAULT: If all else above fails, set the guy to default task
        else {
            var gangtask = defaulttask;	// Default task
            await runCom1(ns,'ns.gang.setMemberTask(ns.args[0], ns.args[1])','setGnTask', [member, gangtask]);
            ns.print("║ 📱"+ij +". 🚶:"+member+" > "+gangtask.substring(0,lenCom) );
        }
            
        // Print stats of member
        var mult = ns.nFormat(asMult2[ij], "0.00"); // ❌ Multiplier (cross)
        var mstr = ns.nFormat(memstr, "0.a");	// 💪 Strength (muscle)
        var mdef = ns.nFormat(memdef, "0.a"); // 🦴 Defense (bone)
        var mdex = ns.nFormat(memdex, "0.a"); // 👀 Dexterity (eyes)
        var magi = ns.nFormat(memagi, "0.a"); // 🦶 Agility (feet)
    
        // Print status line OR Ascended status notice when ascended
        if (didasc[ij] == 0) { 
            ns.print("║ ❌"+mult+"/"+minmult+" 💪"+mstr+" 🦴"+mdef+" 👀"+mdex+" 🦶"+magi+" 🧠" +ascmem[ij]); } else {	ns.print(" 🌟🌟🌟🌟🌟 A S C E N D E D ! 🌟🌟🌟🌟🌟");	}
    
    }
    // ###### MAIN FOR LOOP END #####
    
        loops++; // Increment loop counter
    
        // #### START Write status to txt file #### 
        var txtstring = "[";
        let members3 = await runCom1(ns, 'ns.gang.getMemberNames()','getMemNam');  
            for (let ij = 0; ij < members3.length; ++ij) {
                var member = members3[ij];
                var myGang2 = await runCom1(ns, 'ns.gang.getMemberInformation(ns.args[0])','getMemInf', [member]);
                txtstring = txtstring + '{\"name\":\"' + myGang2.name + '\", ';
                txtstring = txtstring + '\"ascmem\":' + ascmem[ij] + '}';
                if (ij!=members3.length-1) {txtstring = txtstring + ','} 
            }
        txtstring = txtstring + ']';	
        var filewrite = await ns.write("/Temp/gang-cfg.txt", txtstring, "w");
        // #### END Write status to txt file ####
    
        // SHOW STATUS
        var money = ns.nFormat(curCash, "0,0a");	//Money in hand: 💰Cur
        var minCash2 = ns.nFormat(minCash, "0,0.0a"); //Minimum cash level: 💰Min
        var getGang = await runCom1(ns, 'ns.gang.getGangInformation()', 'getGangInfo');
        var curResp = ns.nFormat(getGang.respect, "0,0.0a"); // Respect: 🩸Res
            
        var curWant =ns.nFormat(getGang.wantedLevel, "0,0.0a");//Wanted level: 🔥W
        var curPena =ns.nFormat(myGang.wantedPenalty,"0.00a");//Penalty level: W
        var curPenaRatio =getGang.wantedLevel/getGang.respect *100;//Penalty ratio
        var curPenaRatio2 =  ns.nFormat( curPenaRatio , "0.00a") ; //Nicer format
    
        gangt2 = gangt1; gangt1 = gangt0; gangt0 = gangtx;//Add territory history
        gangtx = getGang.territory;	// Get current territory history
        gangt2 = ns.nFormat(gangt2, "0.00%"); // Convert to percentage
        gangtx = ns.nFormat(gangtx, "0.00%"); // Convert to percentage
    
        ns.print("╟────────────────────────────────────────╢");//Bottom footer
        ns.print("║ #: "+loops+" 👜:" +buyStuff+" 👜:$" +cashSpen+" 💰Cur $" +money);
        ns.print("║ 💰Min: $" + minCash2 +" 😎Res: " +curResp + " 🔥W: " +curWant); 
        ns.print("║ W Pen:" +curPena +"%" +"  Wan/Resp:" +curPenaRatio2 +"%"); 
        ns.print("║ 🔪:"+warfare+" ✊:"+warguys +" 🌏: "+gangt2 +"> "+ gangtx); 
        ns.print("╚════════════════════════════════════════╝");//Bottom footer
    
    
        await ns.asleep(sleepdelay); //since await sleep(sleepdelay); // doesn't work anymore?
    
        //Check if gang is just 3 guys+ranked too high, then reset the config file
        //This catches a bug if the gang script crashes/ends for some reason
        if (members3.length < 4 && ascmem[0]>2 && ascmem[1]>2 && ascmem[2]>2) { 
            const resetconfig = await resetGangFile(ns); 
            ns.print ("Resetting gang file: ", resetconfig); 
            ascmem=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
    }
    //       MAIN WHILE LOOP END
    // ###################################
    }
    
    
    // Function: Sleep
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Function: Check chances of war against other gangs
    export async function checkgangwar(ns, winchance) {
        var gangresult = true; // By default we CAN engage in warfare
    
        // Gang names for reference: Tetrads, The Syndicate, Speakers for the Dead
                                //   The Black Hand, The Dark Army, NiteSec
        //const othergang = ns.gang.getOtherGangInformation();	// DEBUG
        //ns.print("Name : "+JSON.stringify(othergang['Tetrads']) ); //DEBUG
        //ns.print("Power: "+JSON.stringify(othergang['Tetrads'].power) ); //DEBUG
        //ns.print("Terro: "+JSON.stringify(othergang['Tetrads'].territory));//DEB
        //ns.print("Clash: "+ns.gang.getChanceToWinClash('Tetrads') ); //DEBUG
    
        // Get chances to win wars for all other gangs:
        var chantetr = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["Tetrads"]);
        var chansynd = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["The Syndicate"]);
        var chanspea = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["Speakers for the Dead"]);
        var chanblac = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["The Black Hand"]);
        var chandark = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["The Dark Army"]);
        var channite = await runCom1(ns, 'ns.gang.getChanceToWinClash(ns.args[0])','getChanWin', ["NiteSec"]);
            //ns.print("Tetrads   %: " + ns.nFormat(chantetr, "0.00%")); //DEBUG
            //ns.print("Syndicate %: " + ns.nFormat(chansynd, "0.00%")); //DEBUG
            //ns.print("Speakers  %: " + ns.nFormat(chanspea, "0.00%")); //DEBUG
            //ns.print("Black Hand%: " + ns.nFormat(chanblac, "0.00%")); //DEBUG
            //ns.print("Dark Army %: " + ns.nFormat(chandark, "0.00%")); //DEBUG
            //ns.print("NiteSec   %: " + ns.nFormat(channite, "0.00%")); //DEBUG
        
        // Check chances are good for warfare, if not then don't engage 
        if (chantetr < winchance) { gangresult = false; }
        if (chansynd < winchance) { gangresult = false; }
        if (chanspea < winchance) { gangresult = false; }
        if (chanblac < winchance) { gangresult = false; }
        if (chandark < winchance) { gangresult = false; }
        if (channite < winchance) { gangresult = false; }
    
            //ns.print("INFO GangResult : " + gangresult ); //DEBUG
        if (gangresult == true) { return true; } 
        if (gangresult == false) { return false; } 
        
    }
    
    // Function: Reset Gang File 
    // Contents of new default gang-cfg.txt file are as follows: 
    // [{"name":"0","ascmem":0},{"name":"1","ascmem":0},{"name":"2","ascmem":0}]
    function resetGangFile(ns) {
       ns.print("WARN  Writing new gang config file...");	
       
       const cfgScriptContent = "[{\"name\":\"0\", \"ascmem\":0},{\"name\":\"1\", \"ascmem\":0},{\"name\":\"2\", \"ascmem\":0}]";
        const cfgScript = "/Temp/gang-cfg.txt";
        
        ns.write(cfgScript, cfgScriptContent, "w");
        return true;
    }
    
    
    //=============================================================================
    // External SCRIPT RUNNER START (adapted/shortened fr ALAIN BRYDEN's scripts)
     
    export async function runCom1(ns, command, fileName, args = []) {
    
        var precursor = "gang5-"; // Could be gang-, blade-, etc 
        var fileName = "/Temp/" + precursor + fileName + ".txt";
        var fileName2 = fileName + ".js";
            //ns.print ("     fileName = ", fileName) // DEBUG
            //ns.print ("     fileName2 = ", fileName2) // DEBUG
    
        // COMPLEX SCRIPT
        let script = `export async function main(ns) {` + 
            `let r;try{r=JSON.stringify(\n` +
            `    ${command}\n` +
            `);}catch(e){r="ERROR: "+(typeof e=='string'?e:e.message||JSON.stringify(e));}\n` +
            `const f="${fileName}"; if(ns.read(f)!==r) await ns.write(f,r,'w') } `;
            
            var oldContents = ns.read(fileName2);
            while (oldContents != script) {
                await ns.write(fileName2, script, "w");
                // Wait for script to appear readable (can be finicky on write)
                var oldContents = ns.read(fileName2);
            }
            
                //ns.print ("args = ", args) // DEBUG
            for (var ij = 0; ij < 5; ij++) { if (args[ij] == null) args[ij] = "0";
                //ns.print ("args[",ij,"] = ", args[ij]) // DEBUG
            };
            
            //Run the script!
            await ns.exec(fileName2,"home",1,args[0],args[1],args[2],args[3]); 
            //await ns.sleep(50); 
            
            // We 'try' to catch JSON errors (they vanish after 1-2 loops)
            const fileData = await ns.read(fileName);
            try {
                var fileData2 = JSON.parse(fileData);
            } catch(e) {
                console.log('Unable to parse the string.')
            }
            
            return fileData2; 
    }
    
    // External SCRIPT RUNNER END 
    //=============================================================================
    
    //End Of Line