import { trips, blacklist, samplePacket } from "./data.js";
import {
  cleanTrips,
  totalRevenue,
  uniquePassengers,
  isBlocked,
  revenueByStation,
  createDeviceCache,
  createProcessedRegistry,
  decodeCounter,
  packCounter
} from "./pipeline.js";

console.log("--- TASK 1: cleanTrips ---");
console.log(cleanTrips(trips));
console.log("count:", cleanTrips(trips).length, "(expected 7)");

console.log("\n--- TASK 2: totalRevenue ---");
console.log(totalRevenue(trips), "(expected 3.2)");

console.log("\n--- TASK 3: uniquePassengers / isBlocked ---");
console.log(uniquePassengers(trips));
console.log('isBlocked("AZ-1003", blacklist):', isBlocked("AZ-1003", blacklist), "(expected true)");
console.log('isBlocked("AZ-1001", blacklist):', isBlocked("AZ-1001", blacklist), "(expected false)");

console.log("\n--- TASK 4: revenueByStation ---");
console.log(revenueByStation(trips));

console.log("\n--- TASK 5: device cache (WeakMap) ---");
const cache = createDeviceCache();
const device1 = { id: "VLD-01" };
const device2 = { id: "VLD-02" };
cache.remember(device1, "online");
console.log("recall device1:", cache.recall(device1), "(expected online)");
console.log("knows device2:", cache.knows(device2), "(expected false)");

console.log("\n--- TASK 6: processed registry (WeakSet) ---");
const registry = createProcessedRegistry();
const trip1 = trips[0];
console.log("isProcessed before:", registry.isProcessed(trip1), "(expected false)");
registry.markProcessed(trip1);
console.log("isProcessed after:", registry.isProcessed(trip1), "(expected true)");

console.log("\n--- TASK 7: decodeCounter / packCounter ---");
console.log(decodeCounter(samplePacket), "(expected total 146, busiestMinute 9, activeMinutes 8)");

const overflowTest = packCounter([10, 300, -1, 256]);
console.log("packCounter([10, 300, -1, 256]) ->", overflowTest);
console.log("(watch: 300 and 256 wrap around mod 256, -1 wraps to 255)");
