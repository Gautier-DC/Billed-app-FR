import { screen, fireEvent } from "@testing-library/dom"
import {setupLocaleStorage} from "../../setup-jest"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
// import Firestore from "../app/Firestore"
import { localStorageMock } from "../__mocks__/localStorage";
import firebase from "../__mocks__/firebase";

jest.mock("../app/Firestore");

const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
}
setupLocaleStorage('Employee')

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then Newbill formular should be displayed", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId('form-new-bill')).toBeTruthy()
    })
    test("Then the formular should have 9 fields", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId('form-new-bill').length).toEqual(9)
    })
    describe("And I want to upload a file", () => {
      test("Then a file should appear in the field", () =>{
        const html = NewBillUI()
        document.body.innerHTML = html
        const newBill = new NewBill({document, onNavigate, firestore: undefined, localStorage: window.localStorage})
        // newBill.handleChangeFile = jest.fn()

        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const monFichier = screen.getByTestId('file');
        monFichier.addEventListener("change", handleChangeFile);
        fireEvent.change(monFichier, {
          target: {
            files: [new File(["thumbmail.jpg"], "thumbmail.jpg", { type: "image/jpeg" })],
          },
        });

        expect(handleChangeFile).toHaveBeenCalledTimes(1)


      })
      test("Then an error occured if its a bad format file", () =>{
        const html = NewBillUI()
        document.body.innerHTML = html
      })
    })
  })
})