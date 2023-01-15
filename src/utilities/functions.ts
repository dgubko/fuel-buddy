import { GasTypes, GasPrice } from "./types";

export const findPriceByType = (gasPrices: GasPrice[], fuelType: GasTypes) => {
    const gasPrice = gasPrices.find((gas) => {
        return gas.gasType === fuelType;
      }) 
      return gasPrice as GasPrice;
}