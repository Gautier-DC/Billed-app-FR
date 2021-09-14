import { screen } from "@testing-library/dom"
import VerticalLayout from "../views/VerticalLayout"
import {setupLocaleStorage} from "../../setup-jest"

setupLocaleStorage('Employee')

describe('Given I am connected as Employee', () => {
  describe('When I am on Bills page', () => {
    test("Then Icons should be rendered", () => {
      const html = VerticalLayout(120)
      document.body.innerHTML = html
      expect(screen.getByTestId('icon-window')).toBeTruthy()
      expect(screen.getByTestId('icon-mail')).toBeTruthy()
    })
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: []})
      document.body.innerHTML = html
      //to-do write expect expression
    })
  })
  describe('When I am on NewBill page', () => {
    test("Then newBill icon in vertical layout should be highlighted", () => {

    })
  })
})
