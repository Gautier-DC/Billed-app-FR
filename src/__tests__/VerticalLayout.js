import { screen } from "@testing-library/dom"
import {setupLocaleStorage} from "../../setup-jest"
import router from "../app/Router.js"

//Setup

jest.mock("../containers/Bills.js", () => {
  return jest.fn().mockImplementation(function () {
    return {
      getBills: async function () {
        return [];
      },
    };
  });
});


beforeEach(() => {
  setupLocaleStorage('Employee')
  Object.defineProperty(window, "location", { value: { hash: "#employee/bills" } })
  document.body.innerHTML = `<div id='root'></div>`
  router()
})

afterEach(() => {
  jest.clearAllMocks()
})

//Start tests

describe('Given I am connected as Employee', () => {
  describe('When I am on Bills page', () => {
    test("Then Icons should be rendered", () => {
      expect(screen.getByTestId('icon-window')).toBeTruthy()
      expect(screen.getByTestId('icon-mail')).toBeTruthy()
    })
    test("Then Bill icon in vertical layout should be highlighted", () => {
      expect(screen.getByTestId('icon-window').classList.contains('active-icon')).toBeTruthy()
      expect(screen.getByTestId('icon-mail').classList.contains('active-icon')).not.toBeTruthy()
    })
    
  })
  describe('When I am on NewBill page', () => {
    test("Then Icons should be rendered", () => {
      window.location.hash = "#employee/bill/new"
      document.body.innerHTML = `<div id='root'></div>`
      router()
      expect(screen.getByTestId('icon-window')).toBeTruthy()
      expect(screen.getByTestId('icon-mail')).toBeTruthy()
    })
    test("Then newbill icon in vertical layout should be highlighted", () => {
      window.location.hash = "#employee/bill/new"
      document.body.innerHTML = `<div id='root'></div>`
      router()
      expect(screen.getByTestId('icon-window').classList.contains('active-icon')).not.toBeTruthy()
      expect(screen.getByTestId('icon-mail').classList.contains('active-icon')).toBeTruthy()
    })
  })
})
