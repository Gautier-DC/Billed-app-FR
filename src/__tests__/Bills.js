import { screen } from "@testing-library/dom"
import {setupLocaleStorage} from "../../setup-jest"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills"
import BillsUI from "../views/BillsUI.js"

const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
}
setupLocaleStorage('Employee')


describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    describe("And it is loading", () => {
      test("It should display loading message", () => {
        const html = BillsUI({ loading: true })
        document.body.innerHTML = html
        expect(screen.getAllByText('Loading...')).toBeTruthy()
      })
    })
    describe("But an error occured", () => {
      test("It should display error page", () => {
        const html = BillsUI({ error: 'An error occured' })
        document.body.innerHTML = html
        expect(screen.getAllByText('Erreur')).toBeTruthy()
      })
    })
    describe("And there are Bills", () => {
      test("Then bills should be ordered from earliest to latest", () => {
        const html = BillsUI({ data: bills })
        document.body.innerHTML = html
        const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
        const datesSorted = [...dates].sort((a, b) => ((a < b) ? 1 : -1))
        expect(dates).toEqual(datesSorted)
      })
    })
    describe("And there is a bill", () => {
      describe("When I click on eye icon", () =>{
        test("Then the new bill should open", ()=>{
          const html = BillsUI({ data: bills })
          document.body.innerHTML = html
          const testBill = new Bills({document, onNavigate, firestore: null , localStorage: window.localStorage})
          testBill.handleClickIconEye = jest.fn()
          screen.getAllByTestId('icon-eye')[0].click()
          expect(testBill.handleClickIconEye).toBeCalled()
        })
        test("Then the modal should display the attached file", ()=>{
          const html = BillsUI({ data: bills })
          document.body.innerHTML = html
          const testBill = new Bills({document, onNavigate, firestore: null , localStorage: window.localStorage})
          const iconEye = screen.getAllByTestId('icon-eye')[0]
          $.fn.modal = jest.fn()
          testBill.handleClickIconEye(iconEye)
          expect($.fn.modal).toBeCalled()
          expect(document.querySelector('.modal')).toBeTruthy()
        })
      })
      describe("When I am in the modal", ()=> {
        describe("When I click on the close button", ()=> {
          test("It should close the modal", ()=> {
            const html = BillsUI({ data: bills })
            document.body.innerHTML = html
            /* const testBill = new Bills({document, onNavigate, firestore: null , localStorage: window.localStorage})
            const iconEye = screen.getAllByTestId('icon-eye')[0]
            $.fn.modal = jest.fn()
            testBill.handleClickIconEye(iconEye)
            expect($.fn.modal).toBeCalled() */
            expect(document.querySelector('.modal')).not.toBeTruthy()
          })
        })
      })
    })
  })
})