import { screen } from "@testing-library/dom"
import VerticalLayout from "../views/VerticalLayout"
import {setupLocaleStorage} from "../../setup-jest"
import BillsUI from "../views/BillsUI.js"
import Bills from "../containers/Bills"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

beforeEach(() => {
  setupLocaleStorage('Employee')
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Given I am connected as Employee', () => {
  describe('When I am on Bills page', () => {
    test("Then Icons should be rendered", () => {
      const html = VerticalLayout(120)
      document.body.innerHTML = html
      expect(screen.getByTestId('icon-window')).toBeTruthy()
      expect(screen.getByTestId('icon-mail')).toBeTruthy()
    })
    
  })
  describe('When I am on NewBill page', () => {
    test("Then Icons should be rendered", () => {
      const html = VerticalLayout(120)
      document.body.innerHTML = html
      expect(screen.getByTestId('icon-window')).toBeTruthy()
      expect(screen.getByTestId('icon-mail')).toBeTruthy()
    })
    test("Then newbill icon in vertical layout should be highlighted", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      console.log("===========", html)
      expect(screen.getByTestId('icon-window').classList.contains('active-icon')).not.toBeTruthy()
      expect(screen.getByTestId('icon-mail').classList.contains('active-icon')).toBeTruthy()
    })
  })
})
