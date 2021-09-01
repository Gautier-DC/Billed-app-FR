import { screen } from "@testing-library/dom"
import VerticalLayout from "../views/VerticalLayout"
import {setupLocaleStorage} from "../../setup-jest"

setupLocaleStorage('Employee')

describe('Given I am connected as Employee', () => {
  test("Then Icons should be rendered", () => {
    const html = VerticalLayout(120)
    document.body.innerHTML = html
    expect(screen.getByTestId('icon-window')).toBeTruthy()
    expect(screen.getByTestId('icon-mail')).toBeTruthy()
  })

})
