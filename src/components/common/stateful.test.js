import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Index from './stateful'

configure({adapter: new Adapter})

describe('Header Test', () => {
  it('render', () => {
    const wrapper = shallow(<Index/>)
    expect(wrapper.find(Index)).toBeDefined()
  })
})