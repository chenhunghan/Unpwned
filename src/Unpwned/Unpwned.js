import { Component } from 'react';
import PropTypes from "prop-types";
import { sha1 } from './sha1';

class Unpwned extends Component {
    static propTypes = {
        render: PropTypes.func.isRequired,
    };
    state = {
        pwned: false,
    }
    checkHaveIBeenPwned = async (password) => {
        const hash = await sha1(password);
        const res = await fetch(
            `https://api.pwnedpasswords.com/range/${hash.substring(0, 5)}`,
        );
        if (res.status === 200) {
            const body = await res.text();
            const start = body.indexOf(hash.substring(5));
            const end = body.slice(start).search(/[\r\n]+/) + start;
            const n = Number(body.slice(start + 36, end));
            if (n > 0) {
                this.setState({ pwned: true });
            }
            if (!n) {
                this.setState({ pwned: false });
            }
        }
    }
    render() {
        const { pwned } = this.state;
        const { checkHaveIBeenPwned } = this;
        const { render } = this.props;
        return render({
            pwned,
            checkHaveIBeenPwned
        })
    }
}

export { Unpwned }