// TASK 1
export function cleanTrips(trips) {
  return trips.filter((trip) => trip.valid === true && trip.fare > 0);
}

// TASK 2
export function totalRevenue(trips) {
  const clean = cleanTrips(trips);
  const sum = clean.reduce((acc, trip) => acc + trip.fare, 0);
  // avoid floating point noise (0.1 + 0.2 problem)
  return Math.round(sum * 100) / 100;
}

//TASK 3
export function uniquePassengers(trips) {
  const clean = cleanTrips(trips);
  return new Set(clean.map((trip) => trip.cardId));
}

export function isBlocked(cardId, blacklist) {
  const blocked = new Set(blacklist);
  return blocked.has(cardId);
}

//TASK 4
export function revenueByStation(trips) {
  const clean = cleanTrips(trips);
  return clean.reduce((report, trip) => {
    const previous = report.get(trip.station) || 0;
    report.set(trip.station, Math.round((previous + trip.fare) * 100) / 100);
    return report;
  }, new Map());
}

// TASK 5
export function createDeviceCache() {
  const cache = new WeakMap();

  return {
    remember(device, status) {
      cache.set(device, status);
      return true;
    },
    recall(device) {
      return cache.get(device);
    },
    knows(device) {
      return cache.has(device);
    }
  };
}

//TASK 6
export function createProcessedRegistry() {
  const processed = new WeakSet();

  return {
    markProcessed(trip) {
      processed.add(trip);
      return true;
    },
    isProcessed(trip) {
      return processed.has(trip);
    }
  };
}

// TASK 7 
export function decodeCounter(packet) {
  const total = packet.reduce((sum, n) => sum + n, 0);

  const busiestMinute = packet.reduce(
    (bestIdx, n, idx, arr) => (n > arr[bestIdx] ? idx : bestIdx),
    0
  );

  const activeMinutes = packet.filter((n) => n > 0).length;

  return { total, busiestMinute, activeMinutes };
}

export function packCounter(numbers) {
  
  return Uint8Array.from(numbers);
}
