import { shallow } from 'enzyme'

import TestedComponent from '../pages/index.js'

describe('Index', () => {
  const wrapper = shallow(<TestedComponent />)

  it('shows "Hello world!"', () => {
    const actual = wrapper.find('div').text()
    const expected = 'Hello world!'

    expect(actual).toEqual(expected)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
