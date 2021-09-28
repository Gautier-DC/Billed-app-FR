import {setupLocaleStorage} from "../../setup-jest"
import { fireEvent, screen} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firestore from "../app/Firestore.js"
import firebase from "../__mocks__/firebase"
import { ROUTES } from "../constants/routes"

// Setup

const onNavigate = ((pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
})

beforeEach(() => {
  const html = NewBillUI()
  document.body.innerHTML = html
  setupLocaleStorage('Employee')
  Object.defineProperty(window, "location", { value: { hash: "#employee/bill/new" } })
})

afterEach(() => {
  document.body.innerHTML = null
  jest.clearAllMocks()
})

// Start tests

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then Newbill formular should be displayed", () => {
      expect(screen.getByTestId('form-new-bill')).toBeTruthy()
    })
    test("Then the formular should have 9 fields", () => {
      expect(screen.getByTestId('form-new-bill').length).toEqual(9)
    })
  })
  describe("And I want to upload a file", () => {
    test("Then a file should appear in the field", () =>{
      const testnewBill = new NewBill({ document, onNavigate, firestore: firestore, localStorage: window.localStorage })
      const handleChangeFile = jest.fn(testnewBill.handleChangeFile)
      const myFile = screen.getByTestId('file')
      myFile.addEventListener("change", handleChangeFile)
      fireEvent.change(myFile, {
          target: {
              files: [new File(["test-img.txt"], "test-img.txt", { type: "text/txt" })],
          }
      })
      expect(handleChangeFile).toHaveBeenCalledTimes(1)
      expect(myFile.files.length).toEqual(1)
    })
    test("Then an error occured if its a bad format file", () =>{
      const testnewBill = new NewBill({ document, onNavigate, firestore: firestore, localStorage: window.localStorage })
      const handleChangeFile = jest.fn(testnewBill.handleChangeFile)
      const myFile = screen.getByTestId('file')
      myFile.addEventListener("change", handleChangeFile)
      fireEvent.change(myFile, {
          target: {
              files: [new File(["wrong-img.txt"], "wrong-img.txt", { type: "text/txt" })],
          }
      })
      expect(handleChangeFile).toHaveBeenCalledTimes(1)
      expect(myFile.files[0].name).toBe("wrong-img.txt")
      expect(screen.getByTestId('error-msg')).toBeTruthy()
    })
  })
  describe("When I've completed well the formular and I clicked on submit", () => {
    test("Then a new bill is created", () =>{
      const testnewBill = new NewBill({ document, onNavigate, firestore: firestore, localStorage: window.localStorage })
      const isOkBill = {
        type: "Transports",
        name: "Bus",
        amount: "3",
        date: "2021-09-09",
        vat: "4",
        pct: "3",
        commentary: "This is a valid bill",
        fileUrl: "https://firebasestorage.googleapis.com/v0/b/billable-677b6.appspot.com/o/justificatifs%2Fkitano-wonda2.png?alt=media&token=bc383c25-b7b2-47e2-bdb9-f11e519cdd3a",
        fileName: "valid-image.jpg"
      }
      const handleSubmit = jest.fn((e) => testnewBill.handleSubmit(e))
      testnewBill.createBill = (testnewBill) => testnewBill
      screen.getByTestId('expense-type').value = isOkBill.type
      screen.getByTestId('expense-name').value = isOkBill.name
      screen.getByTestId('amount').value = isOkBill.amount
      screen.getByTestId('datepicker').value = isOkBill.date
      screen.getByTestId('vat').value = isOkBill.vat
      screen.getByTestId('pct').value = isOkBill.pct
      screen.getByTestId('commentary').value = isOkBill.commentary
      testnewBill.fileUrl = isOkBill.fileUrl
      testnewBill.fileName = isOkBill.fileName
      const submitForm = screen.getByTestId('form-new-bill')
      submitForm.addEventListener('click', handleSubmit)
      fireEvent.click(submitForm)
      expect(handleSubmit).toBeCalledTimes(1)
    })
  })
})

// Integration tests POST

describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to New Bill", () => {
    test("create a new bill POST", async () => {
       const postSpy = jest.spyOn(firebase, "post")
       const bills = await firebase.post(NewBill)
       expect(postSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(1)
    })
  })
})