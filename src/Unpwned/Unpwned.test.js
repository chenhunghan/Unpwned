import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import { Unpwned } from './Unpwned';
import { mockText } from './mockText';

global.fetch = jest.fn().mockImplementation(() => 
    new Promise((resolve, reject) => {
        resolve({
            status: 200,
            text: () => {
                return mockText
            }
        });
    })
);

describe('when input value changes, check if value (password) is pwned.', () => {
    const errorText = 'password has been hacked!'
    const wrapper = shallow(
        <Unpwned render={({ pwned, checkHaveIBeenPwned }) =>
            <Fragment>
                <input
                    type="password"
                    onChange={(e) => checkHaveIBeenPwned(e.target.value)} />
                <label>{pwned && errorText}</label>
            </Fragment>
        } />
    );
    wrapper.find('input').simulate('change', { target: { value: '1234' } });
    it('should check value (password/1234) by calling haveIbeenPwned API and return error', () => {
        expect(wrapper.find('label').text()).toBe(errorText)
    });
});