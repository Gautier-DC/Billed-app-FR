import {setupLocaleStorage} from "../../setup-jest"
import { fireEvent, screen} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firestore from "../app/Firestore.js"

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

    })
  })
})