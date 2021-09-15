import {setupLocaleStorage} from "../../setup-jest"
import { screen, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firestore from "../app/Firestore.js"
import { ROUTES } from "../constants/routes"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firebase from "../__mocks__/firebase"

const onNavigate = ((pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
})
 
beforeEach(() => {
  const html = NewBillUI()
  document.body.innerHTML = html
  setupLocaleStorage('Employee')
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then Newbill formular should be displayed", () => {
      expect(screen.getByTestId('form-new-bill')).toBeTruthy()
    })
    test("Then the formular should have 9 fields", () => {
      expect(screen.getByTestId('form-new-bill').length).toEqual(9)
    })
    describe("And I want to upload a file", () => {
      test("Then a file should appear in the field", () =>{
        const newBill = new NewBill({document, onNavigate, firestore: firestore, localStorage: window.localStorage})
        const handleChangeFile = jest.fn(newBill.handleChangeFile)
        const myFile = screen.getByTestId('file')
        myFile.addEventListener("change", handleChangeFile)
        fireEvent.change(myFile, {
          target: {
            files: [new File(["regular-image.jpg"], "regular-image.jpg", { type: "image/jpeg" })],
          },
        });
        expect(handleChangeFile).toHaveBeenCalledTimes(1)
      })
      test("Then an error occured if its a bad format file", () =>{
      })
    })
  })
})