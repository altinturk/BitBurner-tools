export async function main(ns) {
    // Basic ns functions can be accessed on the ns object
    ns.getHostname();
    // Some related functions are gathered under a sub-property of the ns object
    ns.stock.getPrice();
    // Some functions need to be await ed
    await ns.hack('n00dles');
   }




   //Write something recursive here
var servers = scan(); //["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"];
var counter = 0;

for (counter = 0; counter < servers.length; counter++) {

	tprintf("Server [%s]", servers[counter]);
}


/*

HacknetManager.js OK          automat1.script     ok       
botnet-1.script  ok          botnet-2.script    ok        
breaker.script   ok          hack-A0.script      ok       
hack-B1.script    ok         joesguns.script    kk        
n00dles.script  ok           nsTest.js         ok         
purchase-server-64g.script sigma-cosmetics.script  kk
sketch.script   kk           test.script     ok           

*/