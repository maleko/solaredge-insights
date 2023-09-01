import { getDateArray, getMonthlyArray } from "./utilities";
import { describe, expect, it } from "@jest/globals";

describe("gets a date array", () => {
  const firstDate = new Date("2021-10-10");
  const secondDate = new Date("2021-10-11");
  const thirdDate = new Date("2021-10-12");

  it("returns an array of dates", () => {
    expect (getDateArray(new Date("2021-10-10"), new Date("2021-10-12"))).toEqual([firstDate, secondDate, thirdDate])
  });
});

describe("monthly array", () => {

  describe("has the same month", () => {
    const startDate = new Date("2021-10-10");
    const endDate = new Date("2021-10-12");

    const resultDate = new Date("2021-10-01");
    const result = [resultDate];

    it("returns an array of one month", () => {
      expect (getMonthlyArray(startDate, endDate)).toEqual(result)
    });
  });

  describe("consecutive month", () => {
    const startDate = new Date("2021-10-10");
    const endDate = new Date("2021-11-12");

    const firstResultDate = new Date("2021-10-01");
    const secondResultDate = new Date("2021-11-01");
    const result = [firstResultDate, secondResultDate];

    it("returns an array of two consecutive months", () => {
      expect (getMonthlyArray(startDate, endDate)).toEqual(result)
    });
  });

  describe("consecutive months", () => {
    const startDate = new Date("2021-10-10");
    const endDate = new Date("2022-01-12");

    const result = [new Date("2021-10-01"), new Date("2021-11-01"), new Date("2021-12-01"), new Date("2022-01-01")];

    it("returns an array of four consecutive months", () => {
      expect (getMonthlyArray(startDate, endDate)).toEqual(result)
    });
  });

});