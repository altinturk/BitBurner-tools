// How much RAM each purchased server will have. In this case, it'll
// be 8GB.
var ram = 1024;

// Iterator we'll use for our loop
var i = 0;

// Continuously try to purchase servers until we've reached the maximum
// amount of servers
//while (i < getPurchasedServerLimit()) {
	// Check if we have enough money to purchase a server
	if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
		// If we have enough money, then:
		//  1. Purchase the server
		//  2. Copy our hacking script onto the newly-purchased server
		//  3. Run our hacking script on the newly-purchased server with 3 threads
		//  4. Increment our iterator to indicate that we've bought a new server
		var hostname = purchaseServer("pserv-" + i, ram);
		scp("hack-B1.script", hostname);
		exec("hack-B1.script", hostname, 24, 'iron-gym');
		++i;
	}
//}