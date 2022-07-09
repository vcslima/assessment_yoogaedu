/* eslint-disable */

import axios from 'axios';

var token = "lMsBrzQ04CQ89elrGwz-g2HZg0NG9TetH81rKGvCY8KLvDCjZD8GFLKlnzOaaHIL8fEnZpsR0LnPmhl47gRj6ymYfPXcsHskOv9-mwsIl7m8dl1fx9yMqeHzOkikdLIi";

export var http = axios.create({
	// baseURL: process.env.VUE_ASSESSMENT,
	baseURL: `https://api.surveymonkey.com/v3/`,
	headers: {
		Authorization: 'bearer ' + token
	}
})