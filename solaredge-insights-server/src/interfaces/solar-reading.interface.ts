export default interface SolarReading {
  energyDetails: {
    timeUnit: string;
    unit: string;
    meters: Array<{
      type: string;
      values: Array<{
        date: string;
        value: number;
      }>
    }>
  }
}