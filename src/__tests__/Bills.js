import { fireEvent, screen } from "@testing-library/dom"
import {setupLocaleStorage} from "../../setup-jest"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills"
import BillsUI from "../views/BillsUI.js"
import firebase from "../__mocks__/firebase"
import { ROUTES } from "../constants/routes"

//Setup

const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
}

beforeEach(() => {
  const html = BillsUI({ data: bills })
  document.body.innerHTML = html
  setupLocaleStorage('Employee')
})

afterEach(() => {
  document.body.innerHTML = null
  jest.clearAllMocks()
})

// Tests Views

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
        const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
        const datesSorted = [...dates].sort((a, b) => ((a < b) ? 1 : -1))
        expect(dates).toEqual(datesSorted)
      })
    })
    describe("And there is a bill", () => {
      describe("When I click on eye icon", () =>{
        test("Then the new bill should open", ()=>{
          const testBill = new Bills({document, onNavigate, firestore: null , localStorage: window.localStorage})
          testBill.handleClickIconEye = jest.fn()
          screen.getAllByTestId('icon-eye')[0].click()
          expect(testBill.handleClickIconEye).toHaveBeenCalledTimes(1)
        })
        test("Then the modal should display the attached file", ()=>{
          const testBill = new Bills({document, onNavigate, firestore: null , localStorage: window.localStorage})
          const iconEye = screen.getAllByTestId('icon-eye')[0]
          $.fn.modal = jest.fn()
          testBill.handleClickIconEye(iconEye)
          expect($.fn.modal).toHaveBeenCalledTimes(1)
          expect(document.querySelector('.modal')).toBeTruthy()
        })
      })
    })
  })
})

// Integration tests GET

describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills", () => {
    test("fetches bills from mock API GET", async () => {
       const getSpy = jest.spyOn(firebase, "get")
       const bills = await firebase.get()
       expect(getSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(4)
    })
    test("fetches bills from an API and fails with 404 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})