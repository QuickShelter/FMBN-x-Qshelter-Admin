import PropertyTemplate from '../../src/modules/common/export-templates/PropertyTemplate'
import { mockDeveloper } from '../../src/mock/developer'
import { mockProperty } from '../../src/mock/property'
import { BrowserRouter } from 'react-router-dom'

describe('<MasterCard />', () => {
  // https://stackoverflow.com/questions/75728532/error-message-uncaught-typeerror-cannot-destructure-property-basename-of-re
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <div>
          <PropertyTemplate _property={mockProperty} developer={mockDeveloper} />
        </div>
      </BrowserRouter>
    )
  })
})