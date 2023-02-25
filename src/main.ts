import { argv } from 'node:process';
import { URL } from 'node:url';
import { pirateUrl } from './node/pirate-url';
import { getArgs } from './jxa/get-args';
import {download} from './node/download';

const arg = argv[2];
if (!arg) throw new TypeError('You must pass URL to first argument.');

const url = new URL(arg);
const pirate = pirateUrl(url);
const args = await getArgs(pirate);
download(args);
