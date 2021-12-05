import './content/styles/index.css';
import { Home, Weather } from './modules';

document.addEventListener('DOMContentLoaded', () => new Home());

new Weather();
