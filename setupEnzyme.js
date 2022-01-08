import { configure } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jsdom-global/register';

configure({ adapter: new EnzymeAdapter() });
