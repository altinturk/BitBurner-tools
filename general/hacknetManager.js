/** @param {NS} ns **/

// taken from https://steamcommunity.com/sharedfiles/filedetails/?id=2703096550
// author Laingsta
//small adjustments

export async function main(ns) {
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    // Disable Logs
    ns.disableLog("disableLog"); 
    ns.disableLog("getServerMoneyAvailable");
    
    // Open log window and show start of script in logs
    ns.tail(); 	
    
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    
    var num_nodes = 0;
    
        while(num_nodes<12) {
            // Check optimal purchase
            var nodeNum = "Default";
            var itemType = "New Node";
            var cheapest = ns.hacknet.getPurchaseNodeCost();
            num_nodes = ns.hacknet.numNodes();
    
                    if(num_nodes>=12) {
                        ns.printf("12 nodes are enough. exiting.");
                    }
    
            // Iterate through all nodes and select lowest purchase/upgrade available
            for (var i = 0; i < num_nodes; i++) {
                var level_cost = ns.hacknet.getLevelUpgradeCost(i, 1);
                var ram_cost = ns.hacknet.getRamUpgradeCost(i, 1);
                var cpu_cost = ns.hacknet.getCoreUpgradeCost(i, 1);
     
                if (level_cost < cheapest) {
                        cheapest = level_cost;
                        nodeNum = i;
                        itemType = "Level";
                } if (ram_cost < cheapest) {
                        cheapest = ram_cost;
                        nodeNum = i;
                        itemType = "RAM";
                } if (cpu_cost < cheapest) {
                        cheapest = cpu_cost;
                        nodeNum = i;
                        itemType = "CPU";
                }
            }
     
            // If affordable, purchase and recalculate above
            var purchased = false;
            while (!purchased) {
                var money = ns.getServerMoneyAvailable("home");
     
                if (money >= cheapest) {
                    if (itemType == "New Node"){
                        ns.hacknet.purchaseNode();
                    } if (itemType == "Level"){
                        ns.hacknet.upgradeLevel(nodeNum , 1);
                    } if (itemType == "RAM"){
                        ns.hacknet.upgradeRam(nodeNum , 1);
                    } if (itemType == "CPU"){
                        ns.hacknet.upgradeCore(nodeNum , 1);
                    }
                    purchased = true;
                }
     
                // If we didn't purchase, wait 10 second and try again
                if(!purchased) {
                    await ns.sleep(10000);
                }
            }
     
        }
    }