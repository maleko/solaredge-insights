import { getDateArray } from "./utilities";

describe("gets a date array", () => {
  const firstDate = new Date("2021-10-10");
  const secondDate = new Date("2021-10-11");
  const thirdDate = new Date("2021-10-12");

  it("returns an array of dates", () => {
    expect (getDateArray(new Date("2021-10-10"), new Date("2021-10-12"))).toEqual([firstDate, secondDate, thirdDate])
  });
});