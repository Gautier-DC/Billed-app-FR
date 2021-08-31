import { screen } from "@testing-library/dom"
import {setupLocaleStorage} from "../../setup-jest"
import { bills } from "../fixtures/bills.js"
import BillsUI from "../views/BillsUI.js"

setupLocaleStorage('Employee')


describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    describe("and there are Bills", () => {
      test("Then bills should be ordered from earliest to latest", () => {
        const html = BillsUI({ data: bills })
        document.body.innerHTML = html
        const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
        const datesSorted = [...dates].sort((a, b) => ((a < b) ? 1 : -1))
        expect(dates).toEqual(datesSorted)
      })
    })
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: []})
      document.body.innerHTML = html
      //to-do write expect expression
    })
  })
})