import { GasTypes, GasPrice, GasStation } from "./types";

export const findPriceByType = (gasPrices: GasPrice[], fuelType: GasTypes) => {
    const gasPrice = gasPrices.find((gas) => {
        return gas.gasType === fuelType;
      }) 
      return gasPrice as GasPrice;
}

export const cleanStationsWithGasPrice = (data: GasStation[]) => {
  return data.filter((station: GasStation) => station.gasPrices)
}

export const sortAndFilterStations = (allStations: GasStation[], location: string, fuelType: GasTypes) => {
  return allStations
    .filter((station: GasStation) => {
      const matchLocation = station.address
        .toLowerCase()
        .includes(location.toLowerCase());

      const hasPrice = station.gasPrices.some((price: GasPrice) => {
        return price.gasType === fuelType;
      });
      return matchLocation && hasPrice;
    })
    .sort((a: GasStation, b: GasStation) => {
      const gasPriceA = findPriceByType(a.gasPrices, fuelType);
      const gasPriceB = findPriceByType(b.gasPrices, fuelType);
      return gasPriceA.price > gasPriceB.price ? 1 : -1;
    });
}